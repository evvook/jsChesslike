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
            const rook = makePiece('R',[makeRooksMovePath,makeRooksAttackPath]);
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
            const king = makePiece('K',[makeKingsMovePath,makeKingsAttackPath]);
            king.initPosition(position);
            if(camp != null){
                camp.join(king);
            }
            return king;
        }
    };
}

export{
    kingMaker,
    rookMaker
}