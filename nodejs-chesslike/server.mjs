import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const express = require('express');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
import { fileURLToPath } from 'url';

import * as cg from './public/chesslike/chessGame.mjs'
import * as dv from './public/chesslike/drawView.mjs'

const app = express();

const jsonParsor = bodyParser.json();
const urlencodeParser = bodyParser.urlencoded({extended:false});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret:'test',
    resave:false,
    saveUninitialized:true,
    store: new MemoryStore(),
}));
app.use(cors({
    // origin:'http://localhost',
    origin:'http://localhost:3000',
    credentials:true
}))

app.get('/chesslike',function(request,response){
    response.sendFile(__dirname+'/views/index.html')
})


function createGameContainer(){
    const games = {}
    return {
        setGame:function(id,gameManager){
            games[id] = { gameManager:gameManager, count:0 };
        },
        getGame:function(id){
            return games[id];
        },
        joinGame:function(id,playerKey){
            const game = games[id];
            if(!game.white){
                game.white = playerKey
                return 'first';
            }else if(!game.black){
                //카운트 시작
                games[id].itId = setInterval(()=>{
                    games[id].count += 1
                    if(games[id].count === 120){
                        this.removeGame(id);
                    }
                },1000)

                game.black = playerKey
                return 'second';
            }
        },
        quitGame:function(id,playerKey,kind){
            const game = games[id];
            const gameManager = game.gameManager;
            if(game.white === playerKey){
                game.white = 'QUIT';
                if(kind == 'quit'){
                    gameManager.giveUp('white');
                }
            }else if(game.black === playerKey){
                game.black = 'QUIT'
                if(kind == 'quit'){
                    gameManager.giveUp('black');
                }
            }
        },
        removeGame:function(id){
            clearInterval(games[id].itId);
            delete games[id];
        },
        getGameList:function(){
            return {...games}
        },
        clearCount:function(id){
            const game = games[id];
            game.count = 0;
        }
    }
}

const gameContainer = createGameContainer();

app.post('/chesslike/list',jsonParsor,function(request,response){
    response.header("Access-Control-Allow-Origin","*");
    const result = [];
    for(let idx in gameContainer.getGameList()){
        result.push({id:idx})
    }
    response.send(JSON.stringify(result))
});

app.post('/chesslike/setup',jsonParsor,function(request,response){
    response.header("Access-Control-Allow-Origin","*");

    const chessGameManager = cg.gameManager(cg.standardGameSetter);
    const gameToken = request.sessionID;
    gameContainer.setGame(gameToken,chessGameManager);

    const result = {
        gameToken:gameToken
    }

    response.send(JSON.stringify(result))
});

app.post('/chesslike/play',jsonParsor,function(request,response){
    response.header("Access-Control-Allow-Origin","*");
    const result = {}
    const game = gameContainer.getGame(request.body.gameToken);
    const chessGameManager = game.gameManager;

    if(request.body.status === 'start'){
        const player = gameContainer.joinGame(request.body.gameToken,request.sessionID);

        const boardData = dv.makeBoard(chessGameManager.getBoardAxis().RANK,chessGameManager.getBoardAxis().FILE);
        const flatBoardData = boardData.flatMap((rank)=>rank);

        result.cells = player==='second'?flatBoardData.reverse():flatBoardData;
        result.boardAxis = chessGameManager.getBoardAxis();
        result.gameContext = chessGameManager.getGameContext();
        result.gameToken = request.body.gameToken;
        result.playerKey = request.sessionID;
        result.player = {white:game.white, black:game.black};

    }else if(request.body.status === 'reload'){
        result.gameContext = chessGameManager.getGameContext();
        result.gameToken = request.body.gameToken;
        result.player = {white:game.white, black:game.black};

    }else if(request.body.status === 'quit'){
        gameContainer.quitGame(request.body.gameToken,request.body.playerKey,request.body.kind);
        if(game.white=== 'QUIT' && (!game.black || game.black === 'QUIT')){
            gameContainer.removeGame(request.body.gameToken);
        }
        result.player = {white:game.white, black:game.black};

    }else if(request.body.status == 'select'){
        gameContainer.clearCount(request.body.gameToken);
        try{
            if(!(game.white && game.black)){
                throw Error('NotInTwoPlayerException');
            }
            if(game[chessGameManager.getActiveCamp()] !== request.body.playerKey){
                throw Error('NotMovePlayerException');
            }
            chessGameManager.selectPosition(request.body.selectedPositionId);
            result.gameContext = chessGameManager.getGameContext();
            result.pathContext = chessGameManager.getMovePath();
        }catch(err){
            result.message = err.message;
        }

    }else if(request.body.status == 'promotion'){
        chessGameManager.promotion(request.body.selectedPositionId);
        result.gameContext = chessGameManager.getGameContext();

    }else if(request.body.status == 'undo'){
        chessGameManager.undo()
        result.gameContext = chessGameManager.getGameContext();

    }else if(request.body.status == 'reset'){
        chessGameManager.reset()
        result.gameContext = chessGameManager.getGameContext();

    }
    response.send(JSON.stringify(result))
});

app.listen(8000, function(){
    console.log('Listening at 8000');
});