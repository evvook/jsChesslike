function makePosition(x,y){
    let onPiece = null;
    return {
        getAxisX : function(){
            return x;
        },
        getAxisY : function(){
            return y;
        },
        getLetter : function(){
            return x+''+y;
        },
        equals : function(position){
            if(x == position.getAxisX() && y == position.getAxisY()){
               return true; 
            }else{
                return false;
            }
        },
        setPiece:function(piece){
            onPiece = piece;
        },
        getPiece:function(){
            return onPiece;
        },
        isEmpty:function(){
            return onPiece == null;
        }
    }
}

function makeBoard(axisX,axisY){
    let board = {};
    for(let xIdx in axisX){
        let xVal = axisX[xIdx];
        for(let yIdx in axisY){
            let yVal = axisY[yIdx];
            board[xVal+''+yVal] = makePosition(xVal,yVal);
        }
    }
    return {
        getPosition(x,y){

            if(axisX.includes(x) &&  axisY.includes(y)){
                return board[x+''+y];
            }else{
                throw 'NotIncludesBoardException';
            }

        },
        isExists(position){
            if(axisX.includes(position.getAxisX()) &&  axisY.includes(position.getAxisY())){
                return true;
            }else{
                return false;
            }
        },
        findPositionByNotation(notation){
            if(board.hasOwnProperty(notation)){
                return board[notation];
            }else{
                throw 'NotIncludesBoardException';
            }
        },
        getPositions:function(){
            return board;
        },
        getOnPieces:function(){
            const pieces = [];
            for(let idx in board){
                const position = board[idx];
                if(!position.isEmpty()){
                    pieces.push(position.getPiece());
                }
            }
            return pieces;
        },
        getAxisX:function(){
            return axisX;
        },
        getAxisY:function(){
            return axisY;
        }
    }
}

function makeCamp(name,advanceSide,unitsSymbols){
    let campUnits = [];
    const campUnitsSymbols = unitsSymbols;
    return {
        getName:function(){
            return name;
        },
        getAdvanceSide(){
            return advanceSide
        },
        join:function(unit){
            //이미 속해있는 경우
            if(unit.getCamp() != null){
                throw 'AlreadyInvolvedSomeCampException';
            }
            campUnits.push(unit);
            unit.setCamp(this);
        },
        isInvolved:function(unit){
            return campUnits.includes(unit);
        },
        getCampUnits(){
            return campUnits;
        },
        findCampUnits(rank){
            const rUnits = [];
            for(let idx in campUnits){
                const unit = campUnits[idx];
                if(rank == unit.getRank()){
                    rUnits.push(unit);
                }
            }
            return rUnits;
        },
        getUnitsSymbol(notation){
            return campUnitsSymbols[notation];
        }
    }
}

function makePiece(rank,pieceMoveMakers){
    let involvedComp = null;
    let onPosition = null;
    let paths = null;

    let spacialChar = null;

    function setPosition(piece, position){
        onPosition = position;
        onPosition.setPiece(piece);
    }
    function clearPosition(){
        onPosition.setPiece(null);
        onPosition = null;
    }

    function setPaths(){
        paths = [];
        for(let idx in pieceMoveMakers){
            let moveMaker = pieceMoveMakers[idx];
            paths.push(...moveMaker(onPosition));
        }
    }

    return {
        getRank:function(){
            return rank;
        },
        getSpecialChar(){
            return spacialChar;
        },
        getPosition:function(){
            return onPosition;
        },
        initPosition:function(position){
            if(onPosition == null){
                setPosition(this,position);
            }else{
                throw 'AlreadySetOnBoardException';
            }
        },
        setCamp:function(camp){
            //이미 속해있는 경우
            if(involvedComp != null){
                throw 'AlreadyInvolvedSomeCampException';
            }
            involvedComp = camp;
            spacialChar = camp.getUnitsSymbol(rank);
        },
        getCamp:function(){
            return involvedComp;
        },
        moveTo:function(position){
            setPaths();
            //같은 위치 안 됨
            if(onPosition.equals(position)){
                throw 'CanNotMoveSamePositionException';
            }
            //그외의 경우
            for(let idx in paths){
                let path = paths[idx];
                if(path.includes(position)){
                    clearPosition();
                    setPosition(this,position);
                    break;
                }
            }
            if(!position.equals(onPosition)){
                throw 'NotMoveOutOfPathException';
            }
        },
        getPath:function(){
            setPaths();
            return paths;
        }
    }
}

export { makeBoard, makeCamp, makePiece }