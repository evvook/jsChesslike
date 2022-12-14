function getMoveFilter(filter){
    return function(from,path){
        const rPath = [];
        for(let idx in path){
            const to = path[idx];
            if(to.isEmpty()){
               rPath.push(to); 
            }else{
                break;
            }
        }

        if(filter != null){
            return filter(from,rPath.filter(to=>to!=null));
        }else{
            return rPath.filter(to=>to!=null);
        }
    }
}

function getAttackFilter(filter){
    return function(from,path){
        const rPath = [];
        for(let idx in path){
            const to = path[idx];
            if(!to.isEmpty()){
                if(!from.getPiece().getCamp().isInvolved(to.getPiece())){
                    rPath.push(to);
                    break;
                }else{
                    break;
                }
            }
        }
        
        if(filter != null){
            return filter(from,rPath.filter(to=>to!=null));
        }else{
            return rPath.filter(to=>to!=null);
        }
    }
}

function getPawnMoveFilter(filter){
    return function(from,path){
        const rPath = path.map((to) => {
            let fromY = from.getAxisY();
            let toY = to.getAxisY();
            if(('upside' === from.getPiece().getCamp().getAdvanceSide() && toY > fromY)
                || ('downside' === from.getPiece().getCamp().getAdvanceSide() && toY < fromY)){
                return to;
            }else{
                return null;
            }
        });
        if(filter){
            return filter(from,rPath.filter(to=>to!=null))
        }else{
            return rPath.filter(to=>to!=null);;
        }
    }
}

function getPawnFirstMoveFilter(filter){
    return function(from,path){
        const rPath = path.map((to) => {
            let fromY = from.getAxisY();
            let toY = to.getAxisY();
            if(('upside' === from.getPiece().getCamp().getAdvanceSide() && fromY === '2')
                || ('downside' === from.getPiece().getCamp().getAdvanceSide() && fromY === '7')){
                    return to;
            }else{
                if(Math.abs(fromY - toY) === 1){
                    return to
                }else{
                    return null;
                } 
            }
        });

        if(filter){
            return filter(from,rPath.filter(to=>to!=null))
        }else{
            return rPath.filter(to=>to!=null);;
        }
    }
}

function getKnightMoveFilter(filter){
    return function(from,path){
        const rPath = [];
        const dPosition = path.pop();
        if(dPosition != null && dPosition.isEmpty()){
            rPath.push(dPosition);
        }

        if(filter){
            return filter(from,rPath.filter(to=>to!=null))
        }else{
            return rPath.filter(to=>to!=null);;
        }
    }
}

function getKnightAttackFilter(filter){
    return function(from,path){
        const rPath = [];
        const dPosition = path.pop();
        if(dPosition != null && !dPosition.isEmpty()){
            if(!from.getPiece().getCamp().isInvolved(dPosition.getPiece())){
                rPath.push(dPosition);
            }
        }

        if(filter){
            return filter(from,rPath.filter(to=>to!=null))
        }else{
            return rPath.filter(to=>to!=null);;
        }
    }   
}

function getCastlingFilter(filter,board){
    function isAttacked(passedPosition,oppositeUnits){
        let result = false;
        oppositeUnits.forEach((unit)=>{
            if(unit.getRank() !== 'K'){
                const paths = unit.getPath();
                paths.forEach((path)=>{
                    path.forEach((position)=>{
                        if(passedPosition.equals(position)){
                            result = true;
                        }
                    });
                });
            }
        });
        return result;
    }
    
    return function(from,path){
        const rPath = path.map((to)=>{
            const opposite = from.getPiece().getCamp().getOpposite()
            const oppositeUnits = opposite.getCampUnits();
            //?????? ????????? ???????????? ??????
            if(opposite.isActive()){
                return to;
            }

            const king = from.getPiece();
            const castlingInfo = king.getCastlingInfo(to);
            const rook = castlingInfo.rook;

            //??????1. ????????? ???????????? ?????? ????????? ???
            const kingsPassedPositions = [];
            const rooksPassdPositions = [];
            const castlingSide = castlingInfo.castlingSide;
            if(castlingSide === 'kingSide'){
                if(rook == null || rook.getPosition().getLetter() !== 'h'+king.getPosition().getAxisY()){
                    return null;
                }
                rooksPassdPositions.push(board.findPositionByNotation('f'+king.getPosition().getAxisY()));
                kingsPassedPositions.push(board.findPositionByNotation('g'+king.getPosition().getAxisY()));
            }else if(castlingSide === 'queenSide'){
                if(rook == null || rook.getPosition().getLetter() !== 'a'+king.getPosition().getAxisY()){
                    return null;
                }
                rooksPassdPositions.push(board.findPositionByNotation('b'+king.getPosition().getAxisY()));
                rooksPassdPositions.push(board.findPositionByNotation('c'+king.getPosition().getAxisY()));
                kingsPassedPositions.push(board.findPositionByNotation('d'+king.getPosition().getAxisY()));
            }
            
            //??????2. ?????? ?????? ??? ?????? ???????????? ????????? ???
            if(king.isMoved() || rook.isMoved()){
                return null;
            }

            //??????3. ?????? ??? ????????? ?????? ????????? ????????? ???
            for(let idx in kingsPassedPositions){
                if(!kingsPassedPositions[idx].isEmpty()){
                    return null;
                }
            }
            for(let idx in rooksPassdPositions){
                if(!rooksPassdPositions[idx].isEmpty()){
                    return null;
                }
            }
            
            //??????4. ?????? ???????????? ??????????????? ????????? ?????? ??????
            if(isAttacked(from,oppositeUnits)){
                return null;
            }

            //??????5. ?????? ??????????????? ???????????? ??????????????? ???????????? ??? ??????
            for(let idx in kingsPassedPositions){
                const passedPosition = kingsPassedPositions[idx];
                if(isAttacked(passedPosition,oppositeUnits)){
                    return null;
                }
            }
            return to;
        });
        if(filter != null){
            return filter(from,rPath.filter(to=>to!=null));
        }else{
            return rPath.filter(to=>to!=null);
        }
    }
}

function getEnpassantFilter(filter,board){
    return function(from,path){
        const rPath = path.map((to) => {
            if(to.isEmpty()){
                let position;
                try{
                    if(from.getPiece().getCamp().getAdvanceSide() === 'upside'){
                        position = board.getPosition(to.getAxisX(),String.fromCharCode(to.getAxisY().charCodeAt(0)-1));
                    }else{
                        position = board.getPosition(to.getAxisX(),String.fromCharCode(to.getAxisY().charCodeAt(0)+1));
                    }
                }catch(err){
                    if(err.message === 'NotIncludesBoardException'){
                        return null;
                    }else{
                        throw err;
                    }
                }

                if(position.isEmpty()){
                    return null;
                }else if(from.getPiece().getCamp().isInvolved(position.getPiece())){
                    return null;
                }else if(position.getPiece().getRank() !== 'P'){
                    return null;
                }else{
                    const oppositePawn = position.getPiece();
                    if(!oppositePawn.isMoved() || oppositePawn.getDefendentCount() !== 0){
                        return null;
                    }else{
                        let deff;
                        if(oppositePawn.getCamp().getAdvanceSide() === 'upside'){
                            deff = Math.abs(oppositePawn.getPosition().getAxisY() - 2);
                        }else{
                            deff = Math.abs(oppositePawn.getPosition().getAxisY() - 7);
                        }
                        if(deff !== 2){
                            return null;
                        }else{
                            return to;
                        }
                    }
                }
            }else{
                return null;
            }
        });

        if(filter != null){
            return filter(from,rPath.filter(to=>to!=null));
        }else{
            return rPath.filter(to=>to!=null);
        }
    }
}

function getProtectRepresentativeFilter(filter){
    return function(from,path){
        const rPath = path.map((to) => {
            const piece = from.getPiece();
            if(!piece.getCamp().isActive()){
                return to;
            }
    
            const representaitve = piece.getCamp().getRepresentative();
    
            const opposite = piece.getCamp().getOpposite();
            const oppositeUnits = opposite.getCampUnits();
    
            const removedPiece = piece.moveTo(to);
            // console.log(piece.getCamp().getName()+"-"+piece.getRank() +':'+ piece.getPosition().getLetter());
    
            let check = false; 
            oppositeUnits.forEach((unit)=>{
                const paths = unit.getPath();
                paths.forEach((path)=>{
                    path.forEach((position)=>{
                        if(!position.isEmpty()){
                            const piece = position.getPiece();
                            if(piece === representaitve){
                                check = true;
                            }
                        }
                    });
                });
            });
    
            piece.moveBack({from:from,to:to,removedPiece:removedPiece,movedPiece:piece});
            // console.log(piece.getCamp().getName()+"-"+piece.getRank() +':'+ piece.getPosition().getLetter());
    
            if(check){
                return null;
            }else{
                return to;
            }
        });
        if(filter != null){
            return filter(from,rPath.filter(to=>to!=null));
        }else{
            return rPath.filter(to=>to!=null);
        }
    }
}

export{
    getMoveFilter,
    getAttackFilter,
    getPawnMoveFilter,
    getPawnFirstMoveFilter,
    getKnightMoveFilter,
    getKnightAttackFilter,
    getProtectRepresentativeFilter,
    getCastlingFilter,
    getEnpassantFilter
}
