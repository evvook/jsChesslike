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

export{
    rookMaker
}