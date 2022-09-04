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
            if(('upside' == from.getPiece().getCamp().getAdvanceSide() && toY > fromY)
                || ('downside' == from.getPiece().getCamp().getAdvanceSide() && toY < fromY)){
                return to;
            }else{
                return null;
            }
        });
        if(filter){
            return filter(from,rPath.filter(to=>to!=null))
        }else{
            return to;
        }
    }
}

function getPawnFirstMoveFilter(filter){
    return function(from,path){
        const rPath = path.map((to) => {
            let fromY = from.getAxisY();
            let toY = to.getAxisY();
            if(('upside' == from.getPiece().getCamp().getAdvanceSide() && fromY == 2)
                || ('downside' == from.getPiece().getCamp().getAdvanceSide() && fromY == 7)){
                    return to;
            }else{
                if(Math.abs(fromY - toY) == 1){
                    return to
                }else{
                    return null;
                } 
            }
        });

        if(filter){
            return filter(from,rPath.filter(to=>to!=null))
        }else{
            return to;
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
            return to;
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
            return to;
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
            console.log(piece.getCamp().getName()+"-"+piece.getRank() +':'+ piece.getPosition().getLetter());
    
            let check = false; 
            oppositeUnits.forEach((unit)=>{
                const paths = unit.getPath();
                paths.forEach((path)=>{
                    path.forEach((position)=>{
                        if(!position.isEmpty()){
                            const piece = position.getPiece();
                            if(piece == representaitve){
                                check = true;
                            }
                        }
                    });
                });
            });
    
            piece.moveBack({from:from,to:to,removedPiece:removedPiece,movedPiece:piece});
            console.log(piece.getCamp().getName()+"-"+piece.getRank() +':'+ piece.getPosition().getLetter());
    
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
    getProtectRepresentativeFilter
}
