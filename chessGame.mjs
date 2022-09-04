import { makeBoard ,makeCamp } from "./parts.mjs";
import { kingMaker,rookMaker } from "./chessPieceMaker.mjs";

function standardGameSetter(){
    const axisX = ['a','b','c','d','e','f','g','h'];
    const axisY = ['1','2','3','4','5','6','7','8'];
    const chessBoard = makeBoard(axisX,axisY);

    const white = makeCamp('white','upside', {K:'♔',R:'♖'});
    white.setRepresentativesRank('K');
    const black = makeCamp('black', 'donwside', {K:'♚',R:'♜'});
    white.setOpposite(black);
    black.setOpposite(white);

    const kMaker = kingMaker(chessBoard);
    kMaker.setCamp(white);
    kMaker.make(chessBoard.findPositionByNotation('e1'));
    kMaker.setCamp(black);
    kMaker.make(chessBoard.findPositionByNotation('e8'));
    black.setRepresentativesRank('K');

    const rMaker = rookMaker(chessBoard);
    rMaker.setCamp(white);
    rMaker.make(chessBoard.findPositionByNotation('a1'));
    rMaker.make(chessBoard.findPositionByNotation('h1'));
    rMaker.setCamp(black);
    rMaker.make(chessBoard.findPositionByNotation('a8'));
    rMaker.make(chessBoard.findPositionByNotation('h8'));

    return {
        getBoard:function(){
            return chessBoard;
        },
        getCamp:function(name){
            if(name == 'white'){
                return white;
            }else if(name = 'black'){
                return black;
            }
        }
    }
}

function gameManager(){
    const gameSetter = standardGameSetter();
    
    const board = gameSetter.getBoard();
    const white = gameSetter.getCamp('white');
    const black = gameSetter.getCamp('black');

    let activeCamp = white;
    let oppositeCamp = black;

    let selectedPiece = null;
    let moves = [];

    function selectPiece(notation){
        const position = board.findPositionByNotation(notation);
        if(position.isEmpty()){
            throw 'ThereIsAnyPieceException';
        }
        const piece = position.getPiece();
        if(!activeCamp.isInvolved(piece)){
            throw 'NotSelectInactivePieceException';
        }
        selectedPiece = piece;
    }
    function unselectPiece(){
        selectedPiece = null;
    }
    function switchActiveCamp(){
        activeCamp.setActiveStatus(false);
        oppositeCamp.setActiveStatus(true);
        [activeCamp, oppositeCamp] = [oppositeCamp, activeCamp]
    }

    return {
        getBoardAxis:function(){
            return {RANK:board.getAxisX(),FILE:board.getAxisY()}
        },
        getGameContext:function(){
            const gameContext = [];
            const positions = board.getPositions();
            for(let idx in positions){
                const position = positions[idx];
                const positionContext = {}
                
                if(position.isEmpty()){
                    positionContext.onPiece = 'EMPTY';
                    positionContext.notation = position.getLetter();
                }else{
                    const piece = position.getPiece();
                    const pieceContext = {};
                    pieceContext.rank = piece.getRank();
                    pieceContext.specialChar = piece.getSpecialChar();

                    const camp = piece.getCamp();
                    const campContext = {}
                    campContext['name'] = camp.getName();
                    campContext['activeStatus'] = (camp == activeCamp)?'ACTIVE':'INACTIVE';

                    pieceContext.camp = campContext;

                    positionContext.onPiece = pieceContext;
                    positionContext.notation = position.getLetter();
                }
                gameContext.push(positionContext);
            }
            return gameContext;
        },
        getMovePath(){
            const movePathContext = []
            if(selectedPiece != null){
                const paths = [];
                const piecePaths = selectedPiece.getPath();
                for(let idx in piecePaths){
                    const path = piecePaths[idx];
                    paths.push(...path);
                }
                
                for(let idx in paths){
                    const movePosition = paths[idx];
                    movePathContext.push({
                        notation:movePosition.getLetter()
                    })
                }
            }
            return movePathContext;
        },
        selectPosition:function(notation){
            const position = board.findPositionByNotation(notation);
            if(selectedPiece == null){
                selectPiece(notation);

                //수가 없다면 언셀렉트
                if(selectedPiece.getPath().length == 0){
                    unselectPiece();
                }
            }else{
                //같은위치 선택하면 언셀렉트
                if(position.equals(selectedPiece.getPosition())){
                    unselectPiece();
                } 
                //같은 팀이면 셀렉트
                else if(!position.isEmpty() && position.getPiece().getCamp().isInvolved(selectedPiece)){
                    selectPiece(notation);
                }
                //그 외 경우면 수 실행(moveTo)
                else{
                    const from = selectedPiece.getPosition();
                    const to = board.findPositionByNotation(notation);
                    const removedPiece = selectedPiece.moveTo(to);
                    moves.push({from:from,to:to,removedPiece:removedPiece,movedPiece:selectedPiece});
                    unselectPiece();
                    switchActiveCamp();
                }
            }
        },
        undo:function(){
            const move = moves.pop();
            const movedPiece = move.movedPiece;
            movedPiece.moveBack(move);

            switchActiveCamp();
        }
    }
}

export{
    gameManager
}