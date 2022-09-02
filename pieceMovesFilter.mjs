function getMoveFilter(filter){
    return function(from,to){
        if(to.isEmpty()){
            if(filter){
                return filter(from,to);
            }else{
                return to
            }
            
        }else{
            return null;
        }
    }
}

function getAttackFilter(filter){
    return function(from,to){
        if(to.isEmpty()){
            return null;
        }else{
            if(from.getPiece().getCamp().isInvolved(to.getPiece())){
                throw 'NotPassCampUnitOnPositionException';
            }else{
                if(filter){
                    return filter(from,to)
                }else{
                    return to;
                }
            }
        }
    }
}

function getPawnMoveFilter(filter){
    return function(from,to){
        let fromY = from.getAxisY();
        let toY = to.getAxisY();
        if(('upside' == from.getPiece().getCamp().getAdvanceSide() && toY > fromY)
            || ('downside' == from.getPiece().getCamp().getAdvanceSide() && toY < fromY)){
                if(filter){
                    return filter(from,to)
                }else{
                    return to;
                }
        }else{
            return null;
        }
    }
}

function getPawnFirstMoveFilter(filter){
    return function(from,to){
        let fromY = from.getAxisY();
        let toY = to.getAxisY();
        if(('upside' == from.getPiece().getCamp().getAdvanceSide() && fromY == 2)
            || ('downside' == from.getPiece().getCamp().getAdvanceSide() && fromY == 7)){
            if(filter){
                    return filter(from,to)
                }else{
                    return to;
                }
        }else{
            if(Math.abs(fromY - toY) == 1){
                if(filter){
                    return filter(from,to)
                }else{
                    return to;
                }
            }else{
                return null;
            } 
        }
    }
}

export{
    getMoveFilter,
    getAttackFilter,
    getPawnMoveFilter,
    getPawnFirstMoveFilter
}
