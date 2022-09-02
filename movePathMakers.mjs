function makeMovePathTo(pFinders,filter){
    return function(position){
        let paths = [];
        for(let idx in pFinders){
            let finder = pFinders[idx];
            let directedPosition = position;
            let directionPath = [];
            while(true){
                try{
                    directedPosition = filter(position,finder.find(directedPosition));
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

function makeAttackPathTo(pFinders,filter){
    return function(position){
        let paths = [];
        for(let idx in pFinders){
            let finder = pFinders[idx];
            let directedPosition = position;
            let directedPositionT = position;
            let directionPath = [];
            while(true){
                try{
                    directedPositionT = finder.find(directedPositionT);
                    directedPosition = filter(position,directedPositionT);
                    if(directedPosition != null){
                        directionPath.push(directedPosition);
                        paths.push(directionPath);
                        break;
                    }
                }catch(e){
                    if(e == 'NotIncludesBoardException'){
                        paths.push(directionPath);
                        break;
                    }else if(e == 'NotPassCampUnitOnPositionException'){
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

function makeMovePathOn(pFinderGrp,filter){
    return function(position){
        let rPaths = [];
        for(let idx in pFinderGrp){
            let finders = pFinderGrp[idx];
            let pathPosition = position;
            let tempPath = [];
            for(let pIdx in finders){
                try{
                    let finder = finders[pIdx];
                    pathPosition = filter(position,finder.find(pathPosition));
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

function makeAttackPathOn(pFinderGrp,filter){
    return function(position){
        let rPaths = [];
        for(let idx in pFinderGrp){
            let finders = pFinderGrp[idx];
            let pathPosition = position;
            let tempPath = [];
            for(let pIdx in finders){
                try{
                    let finder = finders[pIdx]
                    pathPosition = finder.find(pathPosition);
                    tempPath.push(pathPosition);
                }catch(e){
                    if(e == 'NotIncludesBoardException'){
                        tempPath = [];
                        break;
                    }else{
                        throw e;
                    }
                }
            }
            //검증
            if(tempPath.length != 0){
                try{
                    let destination = filter(position,tempPath.pop())//경로의 마지막은 목적지
                    if(destination == null){//목적지가 비어있다면 공격 경로 무효
                        rPaths.push([]);
                    }else{
                        while(tempPath.length != 0){//목적지로 가기위한 경로를 탐색
                            if(!tempPath.pop() != null){//경로가 막혀있다면 공격 경로 무효
                                rPaths.push([]);
                                break;
                            }
                        }
                        //경로가 모두 비어있으면 목적지를 담아줌
                        rPaths.push([destination]);
                    }
                }catch(e){
                    if(e == 'NotPassCampUnitOnPositionException'){//경로가 막혀있다면 공격 경로 무효2
                        rPaths.push([]);
                    }
                }
            }else{
                rPaths.push(tempPath)
            }
        }
        return rPaths;
    }
}

// function getRooksMovePathMaker(board){
//     let pFinderToNorth = makePositionFinderNorth(board);
//     let pFinderToEast = makePositionFinderEast(board);
//     let pFinderToSouth = makePositionFinderSouth(board);
//     let pFinderToWest = makePositionFinderWest(board);
//     let pFinders = [pFinderToNorth,pFinderToEast,pFinderToSouth,pFinderToWest]

//     return makeMovePathTo(pFinders,getMoveFilter());
// }

// function getRooksAttackPathMaker(board){
//     let directionNorth = makePositionFinderNorth(board);
//     let directionEast = makePositionFinderEast(board);
//     let directionSouth = makePositionFinderSouth(board);
//     let directionWest = makePositionFinderWest(board);
//     let directions = [directionNorth,directionEast,directionSouth,directionWest]

//     return makeAttackPathTo(directions,getAttackFilter());
// }

// function getBishopsMovePathMaker(board){
//     let directionNorthEast = makePositionFinderNorthEast(board);
//     let directionNorthWest = makePositionFinderNorthWest(board);
//     let directionSouthEast = makePositionFinderSouthEast(board);
//     let directionSouthWest = makePositionFinderSouthWest(board);
//     let directions = [directionNorthEast,directionNorthWest,directionSouthEast,directionSouthWest]

//     return makeMovePathTo(directions,getMoveFilter());
// }

// function getPawnMovePathMaker(board){
//     let path1 = [makePositionFinderNorth(board)];
//     let path2 = [makePositionFinderNorth(board),makePositionFinderNorth(board)];
//     let path5 = [makePositionFinderSouth(board)];
//     let path6 = [makePositionFinderSouth(board),makePositionFinderSouth(board)];

//     let paths = [path1,path2,path5,path6]

//     let moveFilterChain = getMoveFilter(getPawnMoveFilter(getPawnFirstMoveFilter()));
//     return makeMovePathOn(paths,moveFilterChain);

// }

// function getPawnAttackPathMaker(board){
//     let path3 = [makePositionFinderNorthEast(board)];
//     let path4 = [makePositionFinderNorthWest(board)];
//     let path7 = [makePositionFinderSouthEast(board)];
//     let path8 = [makePositionFinderSouthWest(board)];
//     let paths = [path3,path4,path7,path8]; 

//     return makeAttackPathOn(paths,getAttackFilter(getPawnMoveFilter()));
// }

export {
    makeMovePathTo,
    makeAttackPathTo,
    makeMovePathOn,
    makeAttackPathOn
}