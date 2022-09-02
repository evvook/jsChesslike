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
         getPawnFirstMoveFilter 
} from './pieceMovesFilter.mjs';
import { 
        makeMovePathTo,
        makeAttackPathTo,
        makeMovePathOn,
        makeAttackPathOn
} from "./movePathMakers.mjs";
import { makePiece } from "./parts.mjs";

function rookMaker(board){
    const pFinderToNorth = makePositionFinderNorth(board);
    const pFinderToEast = makePositionFinderEast(board);
    const pFinderToSouth = makePositionFinderSouth(board);
    const pFinderToWest = makePositionFinderWest(board);
    const pFinders = [pFinderToNorth,pFinderToEast,pFinderToSouth,pFinderToWest]

    const makeRooksMovePath = makeMovePathTo(pFinders,getMoveFilter());
    const makeRooksAttackPath = makeAttackPathTo(pFinders,getAttackFilter());

    let camp = null;
    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const rooksPrototype = makePiece('R',[makeRooksMovePath,makeRooksAttackPath]);
            const rook = extendsPieceToChessPiece(rooksPrototype);

            rook.initPosition(position);
            if(camp != null){
                camp.join(rook);
            }
            return rook;
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

    const pFindersGrp = [pFinders1,pFinders2,pFinders3,pFinders4,pFinders5,pFinders6,pFinders7,pFinders8]

    const makeKingsMovePath = makeMovePathOn(pFindersGrp,getMoveFilter());
    const makeKingsAttackPath = makeAttackPathOn(pFindersGrp,getAttackFilter());

    let camp = null;
    return {
        setCamp(pCamp){
            camp = pCamp;
        },
        make:function(position){
            const kingsPrototype = makePiece('K',[makeKingsMovePath,makeKingsAttackPath]);
            const king = extendsPieceToChessPiece(kingsPrototype);

            //기능을 확장시킨 킹을 보드에 위치시킴 & 진영에 포함시킴
            king.initPosition(position);
            if(camp != null){
                camp.join(king);
            }
        }
    };
}

function extendsPieceToChessPiece(piecesPrototype){
    function piecesExtends(){
        let hasMoved = false;
        return {
            isMoved:function(){
                return hasMoved;
            },
            move:function(){
                hasMoved = true;
            }
        }
    }

    const piece = Object.create(piecesPrototype);
    Object.assign(piece,piecesExtends());
    piece.moveTo = function(position){
        piecesPrototype.moveTo(position)
        this.move();
    }

    return piece;
}

export{
    kingMaker,
    rookMaker
}