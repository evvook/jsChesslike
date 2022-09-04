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
    const campUnits = [];
    const removedCampUnits = [];
    const campUnitsSymbols = unitsSymbols;
    
    let representative = null;
    let representativesRank = null;

    let opposite = null;

    let activeStatus = false;

    function setRepresentative(){
        if(representative == null){
            if(representativesRank != null){
                for(let idx in campUnits){
                    const unit = campUnits[idx];
                    if(representativesRank == unit.getRank()){
                        representative = unit;
                        break;
                    }
                }
            }
        }
    }

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
            setRepresentative(unit.getRank());
        },
        isInvolved:function(unit){
            if(campUnits.includes(unit)){
                return true;
            }else if(campUnits.map((campUnit)=>{ return campUnit.prototype }).includes(unit)){
                return true;
            }
            return false;
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
        },
        setRepresentativesRank:function(rank){
            if(representativesRank == null){
                representativesRank = rank;
                setRepresentative();
            }else{
                throw 'RepresentativesRankAlreadySetException';
            }
        },
        getRepresentative:function(){
            return representative;
        },
        setOpposite:function(camp){
            if(opposite == null){
                opposite = camp;
            }else{
                throw 'OppositeCampAlreadySetException';
            }
        },
        getOpposite:function(){
            return opposite;
        },
        setActiveStatus:function(pActiveStatus){
            activeStatus = pActiveStatus;
        },
        isActive:function(){
            return activeStatus;
        },
        removeUnit:function(unit){
            const removedUnitsIndex = campUnits.indexOf(unit);
            if(removedUnitsIndex != -1){
                campUnits.splice(removedUnitsIndex,1);
                removedCampUnits.push(unit);
            }
        },
        restoreUnit:function(unit){
            const restoredUnitsIndex = removedCampUnits.indexOf(unit);
            if(restoredUnitsIndex != -1){
                removedCampUnits.splice(restoredUnitsIndex);
                campUnits.push(unit);
            }
        }
    }
}

function makePiece(rank,pieceMoveMakers){
    let involvedCamp = null;
    let onPosition = null;
    let paths = null;
    let moves = null;

    let spacialChar = null;

    function setPosition(piece, position){
        const removedPiece = position.getPiece();
        onPosition = position;
        onPosition.setPiece(piece);
        return removedPiece;
    }
    function clearPosition(){
        onPosition.setPiece(null);
        onPosition = null;
    }

    function setPaths(){
        paths = null;
        moves = [];

        const tempPath = []
        for(let idx in pieceMoveMakers){
            const moveMaker = pieceMoveMakers[idx];
            const paths = moveMaker.getPath(onPosition);
            
            moves.push({type:moveMaker.getType(),paths:paths});
            
            tempPath.push(...paths);
        }
        paths = tempPath;
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
            if(involvedCamp != null){
                throw 'AlreadyInvolvedSomeCampException';
            }
            involvedCamp = camp;
            spacialChar = camp.getUnitsSymbol(rank);
        },
        getCamp:function(){
            return involvedCamp;
        },
        moveTo:function(to){
            const from = onPosition;
            let removedPiece = null;

            //path가 없는 경우는 경로를 필터링하기 위해 moveTo를 호출하는 경우임
            if(paths == null){
                
                const piece = from.getPiece();
                clearPosition();
                removedPiece = setPosition(piece,to);
                if(removedPiece!=null){
                    removedPiece.beRemovedCamp();
                }
            }else{

                for(let idx in paths){
                    let path = paths[idx];
                    if(path.includes(to)){
                        const piece = from.getPiece();
                        clearPosition();
                        removedPiece = setPosition(piece,to);
                        break;                    
                    }
                }
                if(!to.equals(onPosition)){
                    throw 'NotMoveOutOfPathException';
                }
            }
            if(removedPiece!=null){
                removedPiece.beRemovedCamp();
            }
            return removedPiece;
        },
        moveBack:function(move){
            const from = move.from;
            const to = move.to;
            const removedPiece = move.removedPiece;

            const piece = to.getPiece();
            clearPosition();
            setPosition(piece,from);
            to.setPiece(removedPiece);
            if(removedPiece!=null){
                removedPiece.beRestoredCamp();
            }
        },
        getPath:function(){
            setPaths();
            return paths;
        },
        beRemovedCamp:function(){
            const camp = this.getCamp()
            camp.removeUnit(this);
        },
        beRestoredCamp:function(){
            const camp = this.getCamp();
            camp.restoreUnit(this);
        },
        getMoveType:function(to){
            for(let idx in moves){
                const move = moves[idx];
                const filteredPath = move.paths.filter(path=>path.includes(to))
                if(filteredPath.length>0){
                    return move.type;
                }
            }
        }
    }
}

export { makeBoard, makeCamp, makePiece }