const getAjax = (url) => {
    return {
        request: function(reqJson,callback,async){
            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = () => {
                if(httpRequest.readyState === XMLHttpRequest.DONE){
                    if(httpRequest.status === 200){
                        const result = JSON.parse(httpRequest.response);
        
                        callback(result);
                    } else{
                        alert('문제가 있음');
                    }
                }
            }
            // httpRequest.open('POST','/chesslike'+url,async);
            httpRequest.open('POST','http://localhost:8000/chesslike'+url,async);
            httpRequest.setRequestHeader('Content-Type','application/json')
            httpRequest.send(JSON.stringify(reqJson));
        }
    }
}

export default getAjax;