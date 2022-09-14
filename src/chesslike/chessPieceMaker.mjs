import {
    makePositionFinderNorth, 
    makePositionFinderNorthEast,
    makePositionFinderEast, 
    makePositionFinderSouthEast,
    makePositionFinderSouth, 
    makePositionFinderSouthWest, 
    makePositionFinderWest,
    makePositionFinderNorthWest
} from "./positionFinders.mjs";
import { getMoveFilter, 
         getAttackFilter, 
         getPawnMoveFilter,
         getPawnFirstMoveFilter,
         getProtectRepresentativeFilter,
         getKnightMoveFilter,
         getKnightAttackFilter,
         getCastlingFilter
} from './pieceMovesFilter.mjs';
import { 
        makeMovePathTo,
        makeMovePathOn,
        getMoveMaker
} from "./movePathMakers.mjs";
import { makePiece } from "./parts.mjs";



function rookMaker(board){
    const pFinderToNorth = makePositionFinderNorth(board);
    const pFinderToEast = makePositionFinderEast(board);
    const pFinderToSouth = makePositionFinderSouth(board);
    const pFinderToWest = makePositionFinderWest(board);
    const pFinders = [pFinderToNorth,pFinderToEast,pFinderToSouth,pFinderToWest]

    const moveFilter = getMoveFilter(getProtectRepresentativeFilter())
    const attackFilter = getAttackFilter(getProtectRepresentativeFilter());

    const rookMoveMaker = getMoveMaker('move',makeMovePathTo(pFinders),moveFilter);
    const rookAttackMaker = getMoveMaker('attack',makeMovePathTo(pFinders),attackFilter);

    let camp = null;
    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const rooksPrototype = makePiece('R',[rookMoveMaker,rookAttackMaker]);
            const rook = extendsPieceToChessPiece(rooksPrototype);

            rook.initPosition(position);
            if(camp != null){
                camp.join(rook);
            }
            return rook;
        }
    };
}

function bishopMaker(board){
    const pFinderToNorthWest = makePositionFinderNorthWest(board);
    const pFinderToNorthEast = makePositionFinderNorthEast(board);
    const pFinderToSouthEast = makePositionFinderSouthEast(board);
    const pFinderToSouthWest = makePositionFinderSouthWest(board);
    const pFinders = [pFinderToNorthWest,pFinderToNorthEast,pFinderToSouthEast,pFinderToSouthWest]
    
    const moveFilter = getMoveFilter(getProtectRepresentativeFilter())
    const attackFilter = getAttackFilter(getProtectRepresentativeFilter());
    
    const bishopMoveMaker = getMoveMaker('move',makeMovePathTo(pFinders),moveFilter);
    const bishopAttackMaker = getMoveMaker('attack',makeMovePathTo(pFinders),attackFilter);
    
    let camp = null;
    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const bishopsPrototype = makePiece('B',[bishopMoveMaker,bishopAttackMaker]);
            const bishop = extendsPieceToChessPiece(bishopsPrototype);
            
            bishop.initPosition(position);
            if(camp != null){
                camp.join(bishop);
            }
            return bishop;
        }
    };
}

function queenMaker(board){
    const pFinderToNorth = makePositionFinderNorth(board);
    const pFinderToEast = makePositionFinderEast(board);
    const pFinderToSouth = makePositionFinderSouth(board);
    const pFinderToWest = makePositionFinderWest(board);
    const pFinderToNorthWest = makePositionFinderNorthWest(board);
    const pFinderToNorthEast = makePositionFinderNorthEast(board);
    const pFinderToSouthEast = makePositionFinderSouthEast(board);
    const pFinderToSouthWest = makePositionFinderSouthWest(board);
    const pFinders = [pFinderToNorth,pFinderToEast,pFinderToSouth,pFinderToWest,pFinderToNorthWest,pFinderToNorthEast,pFinderToSouthEast,pFinderToSouthWest]
    
    const moveFilter = getMoveFilter(getProtectRepresentativeFilter())
    const attackFilter = getAttackFilter(getProtectRepresentativeFilter());

    const queenMoveMaker = getMoveMaker('move',makeMovePathTo(pFinders),moveFilter);
    const queenAttackMaker = getMoveMaker('attack',makeMovePathTo(pFinders),attackFilter);

    let camp = null;
    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const queensPrototype = makePiece('Q',[queenMoveMaker,queenAttackMaker]);
            const queen = extendsPieceToChessPiece(queensPrototype);

            queen.initPosition(position);
            if(camp != null){
                camp.join(queen);
            }
            return queen;
        }
    };   
}

function kingMaker(board){
    const pFinders1 = [makePositionFinderNorth(board)];
    const pFinders2 = [makePositionFinderNorthEast(board)];
    const pFinders3 = [makePositionFinderEast(board)];
    const pFinders4 = [makePositionFinderSouthEast(board)];
    const pFinders5 = [makePositionFinderSouth(board)];
    const pFinders6 = [makePositionFinderSouthWest(board)];
    const pFinders7 = [makePositionFinderWest(board)];
    const pFinders8 = [makePositionFinderNorthWest(board)];
    const pFindersGrp = [pFinders1,pFinders2,pFinders3,pFinders4,pFinders5,pFinders6,pFinders7,pFinders8];

    const cpFinder1 = [makePositionFinderEast(board),makePositionFinderEast(board)];
    const cpFinder2 = [makePositionFinderWest(board),makePositionFinderWest(board)];
    const cpFindersGrp = [cpFinder1,cpFinder2];

    const moveFilter = getMoveFilter(getProtectRepresentativeFilter());
    const attackFilter = getAttackFilter(getProtectRepresentativeFilter());
    const castlingFilter = getCastlingFilter(getMoveFilter(getProtectRepresentativeFilter()),board);

    // const makeKingsMovePath = makeMovePathOn(pFindersGrp);
    const kingMoveMaker = getMoveMaker('move',makeMovePathOn(pFindersGrp),moveFilter);
    const kingAttackMaker = getMoveMaker('attack',makeMovePathOn(pFindersGrp),attackFilter);
    const castlingMaker = getMoveMaker('castling',makeMovePathOn(cpFindersGrp),castlingFilter);

    let camp = null;
    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const kingsPrototype = makePiece('K',[kingMoveMaker,kingAttackMaker,castlingMaker]);
            const king = extendsPieceToChessPiece(kingsPrototype,board);

            //기능을 확장시킨 킹을 보드에 위치시킴 & 진영에 포함시킴
            king.initPosition(position);
            if(camp != null){
                camp.join(king);
            }
        }
    };
}

function pawnMaker(board){
    const mpFinders1 = [makePositionFinderNorth(board)];
    const mpFinders2 = [makePositionFinderNorth(board),makePositionFinderNorth(board)];
    const mpFinders3 = [makePositionFinderSouth(board)];
    const mpFinders4 = [makePositionFinderSouth(board),makePositionFinderSouth(board)];
    const mpFindersGrp = [mpFinders1,mpFinders2,mpFinders3,mpFinders4];

    const apFinders1 = [makePositionFinderNorthEast(board)];
    const apFinders2 = [makePositionFinderNorthWest(board)];
    const apFinders3 = [makePositionFinderSouthEast(board)];
    const apFinders4 = [makePositionFinderSouthWest(board)];
    const apFindersGrp = [apFinders1,apFinders2,apFinders3,apFinders4];

    const moveFilter = getMoveFilter(getPawnMoveFilter(getPawnFirstMoveFilter(getProtectRepresentativeFilter())));
    const attackFilter = getAttackFilter(getPawnMoveFilter(getProtectRepresentativeFilter()));

    const pawnMoveMaker = getMoveMaker('move',makeMovePathOn(mpFindersGrp),moveFilter);
    const pawnAttackMaker = getMoveMaker('attack',makeMovePathOn(apFindersGrp),attackFilter);

    let camp = null;

    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const pawnsPrototype = makePiece('P',[pawnMoveMaker,pawnAttackMaker]);
            const pawn = extendsPieceToChessPiece(pawnsPrototype);

            pawn.initPosition(position);
            if(camp != null){
                camp.join(pawn);
            }
        }
    };
}

function knightMaker(board){
    const pFinders1 = [makePositionFinderNorth(board),makePositionFinderNorthEast(board)];
    const pFinders2 = [makePositionFinderEast(board),makePositionFinderNorthEast(board)];
    const pFinders3 = [makePositionFinderEast(board),makePositionFinderSouthEast(board)];
    const pFinders4 = [makePositionFinderSouth(board),makePositionFinderSouthEast(board)];
    const pFinders5 = [makePositionFinderSouth(board),makePositionFinderSouthWest(board)];
    const pFinders6 = [makePositionFinderWest(board),makePositionFinderSouthWest(board)];
    const pFinders7 = [makePositionFinderWest(board),makePositionFinderNorthWest(board)];
    const pFinders8 = [makePositionFinderNorth(board),makePositionFinderNorthWest(board)];

    const pFindersGrp = [pFinders1,pFinders2,pFinders3,pFinders4,pFinders5,pFinders6,pFinders7,pFinders8];

    const moveFilter = getKnightMoveFilter(getProtectRepresentativeFilter());
    const attackFilter = getKnightAttackFilter(getProtectRepresentativeFilter());

    const knightMoveMaker = getMoveMaker('move',makeMovePathOn(pFindersGrp),moveFilter);
    const knightAttackMaker = getMoveMaker('attack',makeMovePathOn(pFindersGrp),attackFilter);

    let camp = null;

    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const knightsPrototype = makePiece('N',[knightMoveMaker,knightAttackMaker]);
            const knight = extendsPieceToChessPiece(knightsPrototype);

            knight.initPosition(position);
            if(camp != null){
                camp.join(knight);
            }
        }
    };
}

function extendsPieceToChessPiece(piecesPrototype,board){
    function piecesExtends(){
        let hasMoved = false;
        let relativeCount = 0;
        return {
            isMoved:function(){
                return hasMoved;
            },
            move:function(){
                hasMoved = true;
            },
            countTurn:function(){
                relativeCount++;
            },
            countBack:function(){
                relativeCount -= 1;
                if(relativeCount == 0){
                    hasMoved = false;
                }
            },
            getCastlingInfo(to){
                if(this.getRank() != 'K'){
                    throw 'OnlyKingMovesCastlingException';
                }
                const castlingSide = prepareCastling(piece,to);
                return {rook:castlingRook,castlingSide:castlingSide};
            }
        }
    }
    function prepareCastling(piece,to){
        let rooksPositionsNotation;
        let rooksCastlingPositionNotation;
        let castlingSide;

        const deferOfPositions = to.getAxisX().charCodeAt(0) - piece.getPosition().getAxisX().charCodeAt(0);
        if(deferOfPositions > 0){
            rooksPositionsNotation = 'h'+piece.getPosition().getAxisY();
            rooksCastlingPositionNotation = 'f'+piece.getPosition().getAxisY();
            castlingSide = 'kingSide';
        }else{
            rooksPositionsNotation = 'a'+piece.getPosition().getAxisY();
            rooksCastlingPositionNotation = 'd'+piece.getPosition().getAxisY();
            castlingSide = 'queenSide';
        }
        piece.getCamp().findCampUnits('R').forEach((unit)=>{
            if(unit.getPosition().getLetter() == rooksPositionsNotation){
                castlingRook = unit;
                castlingRooksMove.from = board.findPositionByNotation(rooksPositionsNotation);
                castlingRooksMove.to = board.findPositionByNotation(rooksCastlingPositionNotation);
            }
        });
        return castlingSide;
    }
    
    function castling(piece,to){

        prepareCastling(piece,to);
        try{
            piece.move();
            piece.countTurn();
            castlingRook.move();
            castlingRook.countTurn();

            Object.getPrototypeOf(piece).moveTo(to);
            Object.getPrototypeOf(castlingRook).moveTo(castlingRooksMove.to);
        }catch(e){
            if(e == 'NotMoveOutOfPathException'){
                piece.countBack();
                castlingRook.countBack();
            }
            throw e;
        }

    }

    const piece = Object.create(piecesPrototype);
    Object.assign(piece,piecesExtends());

    let castlingRook = null;
    let castlingRooksMove = {};

    piece.moveTo = function(position){

        const moveType = piecesPrototype.getMoveType(position);
        if(moveType == 'castling'){
            castling(this,position);
        }else{
            try{
                this.move();
                this.countTurn();
                return piecesPrototype.moveTo(position);
            }catch(e){
                if(e == 'NotMoveOutOfPathException'){
                    this.countBack();
                }
                throw e;
            }
        }
    }

    piece.moveBack = function(move){
        if(move.moveType == 'castling'){
            this.countBack();
            castlingRook.countBack();

            piecesPrototype.moveBack(move);
            Object.getPrototypeOf(castlingRook).moveBack(castlingRooksMove);
        }else{
            this.countBack();
            piecesPrototype.moveBack(move);
        }
    }

    return piece;
}

export{
    kingMaker,
    queenMaker,
    rookMaker,
    bishopMaker,
    knightMaker,
    pawnMaker
}