function drawGame(boardAxis,positions,movesPositions,click){
    let board = makeBoard(boardAxis.RANK,boardAxis.FILE);
    let table = makeBoardTalbe(board,click);
    let backgroud = document.getElementById("board");
    if(backgroud.childElementCount > 0){
        backgroud.removeChild(backgroud.firstChild);
    }
    backgroud.append(table);
    setGameInfo(positions,movesPositions)
}

function makeBoard(axisX,axisY,positions){
    let board = [];
    let rank = []
    let idx = 0;
       let checker = null;
       let color = '';
       for(let y in axisY){
        for(let x in axisX){
            let id = axisX[x]+axisY[y];
            if(idx % 8 == 0){
                checker = switchChecker(checker);
            }
            if(checker(idx++)){
                color = '#DEB887';
            }else{
                color = '#FAF0E6';
            }
            let notation = axisX[x]+axisY[y];
            rank[x] = {id:notation,color:color};
        }
        board[y] = rank;
        rank = [];
    }
    return board.reverse();
}

function isOdd(number){
    return number % 2 != 0;
}
function isEven(number){
    return number % 2 == 0;
}

function switchChecker(checker){
    if(checker == null || checker == isOdd){
        return isEven;
    }else{
        return isOdd;
    }
}    

function makeBoardTalbe(board,click){
    
    let table = null;
       let tr = null;
        let td = null;
        let token = null;
        
    table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    
    for(let bIdx in board){
        let rank = board[bIdx];
        for(let rIdx in rank){
            if(token == null){
                token = rank[rIdx].id.charAt(0);
            }
            
            let position = rank[rIdx];
            if(position.id.charAt(0) == token){
                tr = document.createElement('tr');
                table.append(tr);
            }
            let pieceElement = document.createElement('div');
            let pieceP = document.createElement('p');
            pieceElement.className = "piece";
            pieceElement.style.width = "80px";
            pieceElement.style.height = "80px";
            pieceElement.style.margin = "auto";
            pieceElement.style.fontSize = "45pt";
            pieceElement.style.textAlign = "center";
            pieceElement.style.verticalAlign = "middle";
            
            let positionElement = document.createElement('div');
            positionElement.id = position.id
            positionElement.activeStatus = "";
            positionElement.style.width = "80px";
            positionElement.style.height = "80px";
            positionElement.style.display = "flex";
            positionElement.style.backgroundColor = position.color;
            positionElement.addEventListener("click",click);
            positionElement.append(pieceElement);
            
            td = document.createElement('td');
            td.style.border = "solid 1px";
            td.append(positionElement);
            tr.append(td);
        }
    }
    return table;
}    

function setGameInfo(positions,movesPositions){
    for(let idx in positions){
        let position = positions[idx];
        let positionElement = document.querySelector("#"+position.notation);
        
        let piece = position.onPiece;
        if(piece.camp != null || piece.camp != undefined){
            let camp = piece.camp;
            positionElement.activeStatus = camp.activeStatus;
            let pieceElement = document.querySelector("#"+position.notation+" .piece");
            pieceElement.innerText = piece.specialChar;
            /*
            //전역변수로 선언한 체스기물 특수기호 맵핑(서버에서 가져와서 쓰지 않음)
            let campText = campsText[camp.name];
            for(let idx in campText){
                let pieceText = campText[idx];
                if(pieceText.notation == piece.notation){
                    pieceElement.innerText = pieceText.text;
                }
            }
            */
        }else{
            //positionElement.activeStatus = "INACTIVE";
        }
    }
    for(let idx in positions){
        let position = positions[idx];
        let positionElement = document.querySelector("#"+position.notation);
           for(let idx in movesPositions){
               let movesPosition = movesPositions[idx];
               if(position.notation == movesPosition.notation){
                positionElement.activeStatus = "ACTIVE";
                if(position.onPiece != 'EMPTY'){
                    positionElement.style.backgroundColor = '#F4A460';
                }else{
                    positionElement.style.backgroundColor = '#FFE4B5';
                }
               }
           }
    }
}

export{
    drawGame
}