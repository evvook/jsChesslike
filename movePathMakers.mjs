function makeMovePathTo(pFinders){
    return function(position){
        let paths = [];
        for(let idx in pFinders){
            let finder = pFinders[idx];
            let directedPosition = position;
            let directionPath = [];
            while(true){
                try{
                    directedPosition = finder.find(directedPosition);
                    if(directedPosition != null){
                        directionPath.push(directedPosition);
                    }else{
                        paths.push(directionPath);
                        break;
                    }
                }catch(e){
                    if(e == 'NotIncludesBoardException'){
                        paths.push(directionPath);
                        break;
                    }else{
                        throw e;
                    }
                }
            }
        }
        return paths; 
    }
}

function makeMovePathOn(pFinderGrp){
    return function(position){
        let rPaths = [];
        for(let idx in pFinderGrp){
            let finders = pFinderGrp[idx];
            let pathPosition = position;
            let tempPath = [];
            for(let pIdx in finders){
                try{
                    let finder = finders[pIdx];
                    pathPosition = finder.find(pathPosition);
                    if(pathPosition != null){
                        tempPath.push(pathPosition);
                    }else{
                        tempPath = [];
                        break;
                    }
                }catch(e){
                    if(e == 'NotIncludesBoardException'){
                        tempPath = [];
                        break;
                    }else{
                        throw e;
                    }
                }
            }
            rPaths.push(tempPath);
        }
        return rPaths;
    }
}

function getMoveMaker(makePath,filter){
    return {
        getPath:function(from){
            const rPaths = []
            const paths = makePath(from);
            for(let idx in paths){
                const path = paths[idx];
                rPaths.push(filter(from,path));
            }
            return rPaths;
        }
    }
}

export {
    makeMovePathTo,
    makeMovePathOn,
    getMoveMaker
}