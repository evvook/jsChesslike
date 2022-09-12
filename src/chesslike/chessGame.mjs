import { makeBoard ,makeCamp } from "./parts.mjs";
import { kingMaker,rookMaker,knightMaker,pawnMaker } from "./chessPieceMaker.mjs";

function standardGameSetter(){
    const axisX = ['a','b','c','d','e','f','g','h'];
    const axisY = ['1','2','3','4','5','6','7','8'];
    const chessBoard = makeBoard(axisX,axisY);

    const white = makeCamp('white','upside', {K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙'});
    white.setRepresentativesRank('K');
    const black = makeCamp('black', 'downside', {K:'♚',Q:'♛',R:'♜',B:'♝',N:'♞',P:'♟'});
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

    const nMaker = knightMaker(chessBoard);
    nMaker.setCamp(white);
    nMaker.make(chessBoard.findPositionByNotation('b1'));
    nMaker.make(chessBoard.findPositionByNotation('g1'));
    nMaker.setCamp(black);
    nMaker.make(chessBoard.findPositionByNotation('b8'));
    nMaker.make(chessBoard.findPositionByNotation('g8'));    

    const pMaker = pawnMaker(chessBoard);
    pMaker.setCamp(white);
    pMaker.make(chessBoard.findPositionByNotation('a2'));
    pMaker.setCamp(black);
    pMaker.make(chessBoard.findPositionByNotation('h7'));

    return {
        getBoard:function(){
            return chessBoard;
        },
        getCamp:function(name){
            if(name == 'white'){
                return white;
            }else if(name == 'black'){
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

    let promotionContext;

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
    function isPromotion(notation){
        if(selectedPiece.getRank() != 'P'){
            return false;
        }
        if('upside' == selectedPiece.getCamp().getAdvanceSide() && '8' == board.findPositionByNotation(notation).getAxisY()){
            return true;
        }else if('downside' == selectedPiece.getCamp().getAdvanceSide() && '1' == board.findPositionByNotation(notation).getAxisY()){
            return true;
        }else{
            return false;
        }
    }
    function setPromotionContext(){
        promotionContext = [
            {notation:'Q',specialChar:selectedPiece.getCamp().getUnitsSymbol('Q')},
            {notation:'R',specialChar:selectedPiece.getCamp().getUnitsSymbol('R')},
            {notation:'B',specialChar:selectedPiece.getCamp().getUnitsSymbol('B')},
            {notation:'N',specialChar:selectedPiece.getCamp().getUnitsSymbol('N')},
        ]
    }
    function getPromotionContext(){
        const rPromotionContext = promotionContext;
        promotionContext = null;
        return rPromotionContext;
    }

    return {
        getBoardAxis:function(){
            return {RANK:board.getAxisX(),FILE:board.getAxisY()}
        },
        getGameContext:function(){
            const gameContext = {};
            const boardContext = [];
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
                boardContext.push(positionContext);
            }
            gameContext.boardContext = boardContext;
            gameContext.promotionContext = getPromotionContext();
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
                else if(isPromotion(notation)){
                    setPromotionContext();
                    const from = selectedPiece.getPosition();
                    const to = board.findPositionByNotation(notation);
                    const moveType = selectedPiece.getMoveType(to);
                    const removedPiece = selectedPiece.moveTo(to);
                    moves.push({from:from,to:to,removedPiece:removedPiece,movedPiece:selectedPiece,moveType:moveType});
                }
                //그 외 경우면 수 실행(moveTo)
                else{
                    const from = selectedPiece.getPosition();
                    const to = board.findPositionByNotation(notation);
                    const moveType = selectedPiece.getMoveType(to);
                    const removedPiece = selectedPiece.moveTo(to);
                    moves.push({from:from,to:to,removedPiece:removedPiece,movedPiece:selectedPiece,moveType:moveType});
                    unselectPiece();
                    switchActiveCamp();
                }
            }
        },
        undo:function(){
            const move = moves.pop();
            if(move.moveType == 'promotion'){
                move.promotion.beRemovedCamp();
                move.pawn.beRestoredCamp();
                board.findPositionByNotation(move.pawn.getPosition().getLetter()).setPiece(move.pawn);
                this.undo();
            }else{
                const movedPiece = move.movedPiece;
                movedPiece.moveBack(move);
    
                switchActiveCamp();
            }
        },
        promotion(notation){
            let promotionMaker;
            const positionNotation = selectedPiece.getPosition().getLetter();
            if('R' == notation){
                promotionMaker = rookMaker(board);
            }else if('N' == notation){
                promotionMaker = knightMaker(board);
            }
            promotionMaker.setCamp(selectedPiece.getCamp());
            promotionMaker.make(board.findPositionByNotation(positionNotation));
            selectedPiece.beRemovedCamp();
            moves.push({moveType:'promotion',pawn:selectedPiece,promotion:board.findPositionByNotation(positionNotation).getPiece()});
            unselectPiece();
            switchActiveCamp();
        }
    }
}

export{
    gameManager
}