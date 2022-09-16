//액션타입
const SELECT = 'board/SELECT';
const LAY = 'board/LAY';

//액션 생성 함수
export const select = (path) => ({
    type:SELECT,
    path:path
});
export const lay = (boardContext) => ({
    type:LAY,
    boardContext:boardContext
});

//초기상태
const initialState = {};
ajaxRequest({status:'start'},function(result){
    initialState.cells = result.cells;
    initialState.boardContext = result.gameContext.boardContext;
    initialState.gameToken = result.gameToken;
    initialState.ajaxRequest = ajaxRequest;
},false);

function ajaxRequest(reqJson,callback,async){

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
    httpRequest.open('POST','http://localhost:8000/play',async);
    httpRequest.setRequestHeader('Content-Type','application/json')
    httpRequest.send(JSON.stringify(reqJson));
}

//리듀서
function board(state = initialState, action){
    switch(action.type){
        case SELECT:
            return {
                ...state,
                movePath:action.path
            }
        case LAY:
            return {
                ...state,
                movePath:[],
                boardContext:action.boardContext
            }         
        default:
            return state;
    }
}

export default board;