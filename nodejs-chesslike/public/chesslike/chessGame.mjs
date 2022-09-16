import { makeBoard ,makeCamp } from "./parts.mjs";
import { kingMaker,rookMaker,knightMaker,pawnMaker, queenMaker, bishopMaker } from "./chessPieceMaker.mjs";

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

    const qMaker = queenMaker(chessBoard);
    qMaker.setCamp(white);
    qMaker.make(chessBoard.findPositionByNotation('d1'));
    qMaker.setCamp(black);
    qMaker.make(chessBoard.findPositionByNotation('d8'));    

    const rMaker = rookMaker(chessBoard);
    rMaker.setCamp(white);
    rMaker.make(chessBoard.findPositionByNotation('a1'));
    rMaker.make(chessBoard.findPositionByNotation('h1'));
    rMaker.setCamp(black);
    rMaker.make(chessBoard.findPositionByNotation('a8'));
    rMaker.make(chessBoard.findPositionByNotation('h8'));


    const bMaker = bishopMaker(chessBoard);
    bMaker.setCamp(white);
    bMaker.make(chessBoard.findPositionByNotation('c1'));
    bMaker.make(chessBoard.findPositionByNotation('f1'));
    bMaker.setCamp(black);
    bMaker.make(chessBoard.findPositionByNotation('c8'));
    bMaker.make(chessBoard.findPositionByNotation('f8'));

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
    pMaker.make(chessBoard.findPositionByNotation('b2'));
    pMaker.make(chessBoard.findPositionByNotation('c2'));
    pMaker.make(chessBoard.findPositionByNotation('d2'));
    pMaker.make(chessBoard.findPositionByNotation('e2'));
    pMaker.make(chessBoard.findPositionByNotation('f2'));
    pMaker.make(chessBoard.findPositionByNotation('g2'));
    pMaker.make(chessBoard.findPositionByNotation('h2'));
    pMaker.setCamp(black);
    pMaker.make(chessBoard.findPositionByNotation('a7'));
    pMaker.make(chessBoard.findPositionByNotation('b7'));
    pMaker.make(chessBoard.findPositionByNotation('c7'));
    pMaker.make(chessBoard.findPositionByNotation('d7'));
    pMaker.make(chessBoard.findPositionByNotation('e7'));
    pMaker.make(chessBoard.findPositionByNotation('f7'));
    pMaker.make(chessBoard.findPositionByNotation('g7'));
    pMaker.make(chessBoard.findPositionByNotation('h7'));

    return {
        getBoard:function(){
            return chessBoard;
        },
        getCamp:function(name){
            if(name === 'white'){
                return white;
            }else if(name === 'black'){
                return black;
            }
        }
    }
}

function stalemateGameSetter(){
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
    kMaker.make(chessBoard.findPositionByNotation('f7'));
    black.setRepresentativesRank('K');

    const qMaker = queenMaker(chessBoard);
    qMaker.setCamp(white);
    qMaker.make(chessBoard.findPositionByNotation('b8'));

    const rMaker = rookMaker(chessBoard);
    rMaker.setCamp(white);
    rMaker.make(chessBoard.findPositionByNotation('e6'));
    rMaker.make(chessBoard.findPositionByNotation('g6'));

    const bMaker = bishopMaker(chessBoard);
    bMaker.setCamp(white);
    bMaker.make(chessBoard.findPositionByNotation('f5'));

    const pMaker = pawnMaker(chessBoard);
    pMaker.setCamp(white);
    pMaker.make(chessBoard.findPositionByNotation('b3'));
    pMaker.setCamp(black);
    pMaker.make(chessBoard.findPositionByNotation('b5'));

    return {
        getBoard:function(){
            return chessBoard;
        },
        getCamp:function(name){
            if(name === 'white'){
                return white;
            }else if(name === 'black'){
                return black;
            }
        }
    }
}

function gameManager(pGameSetter){
    
    let gameSetter = pGameSetter();
    let board = gameSetter.getBoard();
    let white = gameSetter.getCamp('white');
    let black = gameSetter.getCamp('black');

    let activeCamp = white;
    let oppositeCamp = black;

    let selectedPiece = null;
    let moves = [];

    function selectPiece(notation){
        const position = board.findPositionByNotation(notation);
        if(position.isEmpty()){
            throw Error('ThereIsAnyPieceException');
        }
        const piece = position.getPiece();
        if(!activeCamp.isInvolved(piece)){
            throw Error('NotSelectInactivePieceException');
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
        if(selectedPiece.getRank() !== 'P'){
            return false;
        }
        if('upside' === selectedPiece.getCamp().getAdvanceSide() && '8' === board.findPositionByNotation(notation).getAxisY()){
            return true;
        }else if('downside' === selectedPiece.getCamp().getAdvanceSide() && '1' === board.findPositionByNotation(notation).getAxisY()){
            return true;
        }else{
            return false;
        }
    }
    function getPromotionContext(){
        if(selectedPiece && isPromotion(selectedPiece.getPosition().getLetter())){
            return [
                {notation:'Q',specialChar:selectedPiece.getCamp().getUnitsSymbol('Q')},
                {notation:'R',specialChar:selectedPiece.getCamp().getUnitsSymbol('R')},
                {notation:'B',specialChar:selectedPiece.getCamp().getUnitsSymbol('B')},
                {notation:'N',specialChar:selectedPiece.getCamp().getUnitsSymbol('N')},
            ]
        }else{
            return null;
        }
    }
    function getMatchState(){
        const units = activeCamp.getCampUnits().filter((unit)=>{
            return unit.getPath().flatMap(path=>path).length>0
        })
        if(units.length>0){
            return {status:'ongoing'}
        }else{
            const checkmate = oppositeCamp.getCampUnits().find((unit)=>{
                const paths = unit.getPath().flatMap(path=>path);
                return paths.find(position=>position.getPiece()===activeCamp.getRepresentative())
            })
            if(checkmate){
                return {status:'checkmate', win:checkmate.getCamp().getName()}
            }else{
                return {status:'stalemate'}
            }
        }
    }
    function isEnpassant(notation){
        const to = board.findPositionByNotation(notation);
        return selectedPiece.getMoveType(to) === 'enpassant';
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
                    campContext['activeStatus'] = (camp === activeCamp)?'ACTIVE':'INACTIVE';

                    pieceContext.camp = campContext;

                    positionContext.onPiece = pieceContext;
                    positionContext.notation = position.getLetter();
                }
                boardContext.push(positionContext);
            }
            gameContext.boardContext = boardContext;
            gameContext.promotionContext = getPromotionContext();
            gameContext.matchContext = getMatchState();
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
                if(selectedPiece.getPath().length === 0){
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
                //수를 둠
                else{
                    //의존 카운트를 진행
                    if(moves.length>0){
                        let lastMove = moves[moves.length-1];
                        if(lastMove.moveType === 'promotion'){
                            lastMove = moves[moves.length-2];
                        }
                        const lastMovedPiece = lastMove.movedPiece;
                        lastMovedPiece.countDc();
                    }
                    //프로모션이면
                    if(isPromotion(notation)){
                        const from = selectedPiece.getPosition();
                        const to = board.findPositionByNotation(notation);
                        const moveType = selectedPiece.getMoveType(to);
                        const removedPiece = selectedPiece.moveTo(to);
                        moves.push({from:from,to:to,removedPiece:removedPiece,movedPiece:selectedPiece,moveType:moveType});
                    }
                    //앙파상이면
                    else if(isEnpassant(notation)){
                        const from = selectedPiece.getPosition();
                        const to = board.findPositionByNotation(notation);
                        const moveType = selectedPiece.getMoveType(to);
                        selectedPiece.moveTo(to);
                        const enpassantPiece = moves[moves.length-1].movedPiece;
                        enpassantPiece.beRemovedCamp();
                        enpassantPiece.getPosition().setPiece(null);
                        moves.push({from:from,to:to,enpassantPiece:enpassantPiece,movedPiece:selectedPiece,moveType:moveType});
                        unselectPiece();
                        switchActiveCamp();
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
            }
        },
        undo:function(){
            const move = moves.pop();
            if(move.moveType === 'promotion'){
                move.promotion.beRemovedCamp();
                move.pawn.beRestoredCamp();
                board.findPositionByNotation(move.pawn.getPosition().getLetter()).setPiece(move.pawn);
                this.undo();
            }
            else if(move.moveType === 'enpassant'){
                const enpassantPiece = move.enpassantPiece;
                enpassantPiece.beRestoredCamp();
                enpassantPiece.getPosition().setPiece(enpassantPiece);

                const movedPiece = move.movedPiece;
                movedPiece.countBackDc();
                movedPiece.moveBack(move);
    
                switchActiveCamp();
            }
            else{
                const movedPiece = move.movedPiece;
                movedPiece.countBackDc();
                movedPiece.moveBack(move);
    
                switchActiveCamp();
            }
        },
        promotion(notation){
            let promotionMaker;
            const positionNotation = selectedPiece.getPosition().getLetter();
            if('Q' === notation){
                promotionMaker = queenMaker(board);
            }else if('R' === notation){
                promotionMaker = rookMaker(board);
            }else if('B' === notation){
                promotionMaker = bishopMaker(board);
            }else if('N' === notation){
                promotionMaker = knightMaker(board);
            }
            promotionMaker.setCamp(selectedPiece.getCamp());
            promotionMaker.make(board.findPositionByNotation(positionNotation));
            selectedPiece.beRemovedCamp();
            moves.push({moveType:'promotion',pawn:selectedPiece,promotion:board.findPositionByNotation(positionNotation).getPiece()});
            unselectPiece();
            switchActiveCamp();
        },
        reset(){
            gameSetter = pGameSetter();
            board = gameSetter.getBoard();
            white = gameSetter.getCamp('white');
            black = gameSetter.getCamp('black');
        
            activeCamp = white;
            oppositeCamp = black;
        
            selectedPiece = null;
            moves = [];
        }
    }
}

export{
    gameManager,
    standardGameSetter,
    stalemateGameSetter
}