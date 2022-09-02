function makePositionFinderNorth(pBoard){
    let board = pBoard;
    return {
        find:function(position){
            let northX = position.getAxisX();
            let northY = String.fromCharCode(position.getAxisY().charCodeAt(0)+1);
            return board.getPosition(northX,northY);
        }
    }
}

function makePositionFinderSouth(pBoard){
    let board = pBoard;
    return {
        find:function(position){
            let northX = position.getAxisX();
            let northY = String.fromCharCode(position.getAxisY().charCodeAt(0)-1);
            return board.getPosition(northX,northY);
        }
    }    
}

function makePositionFinderEast(pBoard){
    let board = pBoard;
    return {
        find:function(position){
            let northX = String.fromCharCode(position.getAxisX().charCodeAt(0)+1);
            let northY = position.getAxisY();
            return board.getPosition(northX,northY);
        }
    }    
}

function makePositionFinderWest(pBoard){
    let board = pBoard;
    return {
        find:function(position){
            let northX = String.fromCharCode(position.getAxisX().charCodeAt(0)-1);
            let northY = position.getAxisY();
            return board.getPosition(northX,northY);
        }
    }    
}

function makePositionFinderNorthEast(pBoard){
    let pstnFinderNorth = makePositionFinderNorth(pBoard);
    let pstnFinderEast = makePositionFinderEast(pBoard);
    return {
        find:function(position){
            let northPosition = pstnFinderNorth.find(position);
            let northEastPosition = pstnFinderEast.find(northPosition);
            return northEastPosition;
        }
    }
}

function makePositionFinderSouthEast(pBoard){
    let pstnFinderSouth = makePositionFinderSouth(pBoard);
    let pstnFinderEast = makePositionFinderEast(pBoard);
    return {
        find:function(position){
            let southPosition = pstnFinderSouth.find(position);
            let southEastPosition = pstnFinderEast.find(southPosition);
            return southEastPosition;
        }
    }
}

function makePositionFinderSouthWest(pBoard){
    let pstnFinderSouth = makePositionFinderSouth(pBoard);
    let pstnFinderWest = makePositionFinderWest(pBoard);
    return {
        find:function(position){
            let southPosition = pstnFinderSouth.find(position);
            let southWestPosition = pstnFinderWest.find(southPosition);
            return southWestPosition;
        }
    }
}

function makePositionFinderNorthWest(pBoard){
    let pstnFinderNorth = makePositionFinderNorth(pBoard);
    let pstnFinderWest = makePositionFinderWest(pBoard);
    return {
        find:function(position){
            let northPosition = pstnFinderNorth.find(position);
            let northWestPosition = pstnFinderWest.find(northPosition);
            return northWestPosition;
        }
    }
}

export{ 
        makePositionFinderNorth, 
        makePositionFinderNorthEast,
        makePositionFinderEast, 
        makePositionFinderSouthEast,
        makePositionFinderSouth, 
        makePositionFinderSouthWest, 
        makePositionFinderWest,
        makePositionFinderNorthWest
         }