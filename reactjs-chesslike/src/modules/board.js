import getAjax from '../utils/ajax'

//액션타입
const SETUP = 'board/SETUP';
const SELECT = 'board/SELECT';
const LAY = 'board/LAY';
const RELOAD = 'board/RELOAD'
const RESET = 'board/RESET'
const QUIT = 'board/QUIT'


//액션 생성 함수
export const setup = (gameToken) => ({
    type:SETUP,
    gameToken:gameToken
})
export const select = (path) => ({
    type:SELECT,
    path:path
});
export const lay = (boardContext) => ({
    type:LAY,
    boardContext:boardContext
});
export const reload = (gameToken) => ({
    type:RELOAD,
    gameToken:gameToken
})
export const reset = (gameToken) => ({
    type:RESET,
    gameToken:gameToken
})
export const quit = (gameToken,playerKey,kind) => ({
    type:QUIT,
    gameToken:gameToken,
    playerKey:playerKey,
    kind:kind
})

//초기상태
const initialState = {
    cells:[],
    boardContext:[],
    gameToken:undefined
};

//리듀서
function board(state = initialState, action){
    const ajax = getAjax('/play')
    switch(action.type){
        case SETUP:
            const rData = {...initialState};
            ajax.request({status:'start',gameToken:action.gameToken},function(result){
                rData.cells = result.cells;
                rData.boardContext = result.gameContext.boardContext;
                rData.gameToken = result.gameToken;
                rData.playerKey = result.playerKey;
                rData.player = result.player;
                rData.active = result.gameContext.activeContext;
            },false)
            return rData;
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
        case RELOAD:
            const reloadData = {...state};
            ajax.request({status:'reload',gameToken:action.gameToken},function(result){
                reloadData.boardContext = result.gameContext.boardContext;
                reloadData.gameToken = result.gameToken;
                reloadData.matchContext = result.gameContext.matchContext;
                reloadData.player = result.player;
                reloadData.active = result.gameContext.activeContext;

            },false);
            return reloadData;
        case RESET:
            const resetData = {...state};
            ajax.request({status:'reset',gameToken:action.gameToken},function(result){
                reloadData.boardContext = result.gameContext.boardContext;
                reloadData.gameToken = result.gameToken;
            },false)
            return resetData;
        case QUIT:
            const quitData = {...state}
            ajax.request({status:'quit',gameToken:action.gameToken,playerKey:action.playerKey,kind:action.kind},function(result){
                quitData.gameToken = undefined;
                quitData.playerKey = undefined;
            },false)
            return quitData;
        default:
            return state;
    }
}

export default board;