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
    origin:'http://localhost:3000',
    credentials:true
}))

app.get('/',function(request,response){
    response.sendFile(__dirname+'/view/index.html')
})

const data = {}
app.post('/play',jsonParsor,function(request,response){
    response.header("Access-Control-Allow-Origin","*");
    const result = {}
    if(request.body.status === 'start'){
        const chessGameManager = cg.gameManager(cg.standardGameSetter);
        const gameToken = request.sessionID;
        data[gameToken] = chessGameManager;

        const boardData = dv.makeBoard(chessGameManager.getBoardAxis().RANK,chessGameManager.getBoardAxis().FILE);
        const flatBoardData = boardData.flatMap((rank)=>rank);

        result.cells = flatBoardData;
        result.gameContext = chessGameManager.getGameContext();
        result.gameToken = gameToken;

    }else if(request.body.status == 'select'){
        try{
            const chessGameManager = data[request.body.gameToken];
            chessGameManager.selectPosition(request.body.selectedPositionId);
            result.gameContext = chessGameManager.getGameContext();
            result.pathContext = chessGameManager.getMovePath();
        }catch(err){
            result.message = err.message;
        }

    }else if(request.body.status == 'promotion'){
        const chessGameManager = data[request.body.gameToken];
        chessGameManager.promotion(request.body.selectedPositionId);
        result.gameContext = chessGameManager.getGameContext();

    }else if(request.body.status == 'undo'){
        const chessGameManager = data[request.body.gameToken];
        chessGameManager.undo()
        result.gameContext = chessGameManager.getGameContext();

    }else if(request.body.status == 'reset'){
        const chessGameManager = data[request.body.gameToken];
        chessGameManager.reset()
        result.gameContext = chessGameManager.getGameContext();

    }
    response.send(JSON.stringify(result))
});

app.listen(8000, function(){
    console.log('Listening at 8000');
});