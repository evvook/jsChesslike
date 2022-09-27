const getAjax = (pUrl) => {
    // const url = '/chesslike'+pUrl;
    const url = 'http://localhost:8000/chesslike'+pUrl;

    const response = {}
    const responseList = [];
    function setResponseGame(result){
        for(let key in result){
            if(key === 'cells'){
                response.cells = result[key];
            }else if(key === 'gameContext'){
                response.boardContext = result[key].boardContext;
                response.active = result[key].activeContext;
                response.lastMoveId = result[key].lastMoveContext;
                response.promotionContext = result[key].promotionContext;
                response.matchContext = result[key].matchContext;
            }else if(key === 'pathContext'){
                response.movePath = result[key];
            }else if(key === 'gameToken'){
                response.gameToken = result[key];
            }else if(key === 'playerKey'){
                response.playerKey = result[key];
            }else if(key === 'player'){
                response.player = result[key];
            }else if(key === 'message'){
                response.message = result[key];
            }
        }
    }
    return {
        getRespnoseGame: function(){
            return response;
        },
        getResponseList: function(){
            return responseList;
        },
        request: function(reqJson,callback,async){
            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if(httpRequest.readyState === XMLHttpRequest.DONE){
                    if(httpRequest.status === 200){
                        callback(JSON.parse(httpRequest.response));
                    } else{
                        alert('문제가 있음');
                    }
                }
            }
            httpRequest.open('POST',url,async);
            httpRequest.setRequestHeader('Content-Type','application/json')
            httpRequest.send(JSON.stringify(reqJson));
        },
        requestGame: function(reqJson){
            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if(httpRequest.readyState === XMLHttpRequest.DONE){
                    if(httpRequest.status === 200){
                        setResponseGame(JSON.parse(httpRequest.response));
                    } else{
                        alert('문제가 있음');
                    }
                }
            }
            httpRequest.open('POST',url,false);
            httpRequest.setRequestHeader('Content-Type','application/json')
            httpRequest.send(JSON.stringify(reqJson));
        },        
        requestList: function(){
            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if(httpRequest.readyState === XMLHttpRequest.DONE){
                    if(httpRequest.status === 200){
                        responseList.push(...JSON.parse(httpRequest.response));
                    } else{
                        alert('문제가 있음');
                    }
                }
            }
            httpRequest.open('POST',url,false);
            httpRequest.setRequestHeader('Content-Type','application/json')
            httpRequest.send(JSON.stringify({}));
        }
    }
}

export default getAjax;