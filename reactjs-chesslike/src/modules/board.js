import getAjax from '../utils/ajax'

//액션타입
const SETUP = 'board/SETUP';
const RELOAD = 'board/RELOAD'
const SELECT = 'board/SELECT';
const PROMOTION = 'board/PROMOTION'
const UNDO = 'board/UNDO'
const RESET = 'board/RESET'
const QUIT = 'board/QUIT'
const ERR_MSG_CLEAR = 'board/ERR_MSG_CLEAR'


//액션 생성 함수
export const setup = (gameToken,playType) => ({
    type:SETUP,
    gameToken:gameToken,
    playType:playType
})
export const reload = (gameToken) => ({
    type:RELOAD,
    gameToken:gameToken
})
export const select = (positionId) => ({
    type:SELECT,
    positionId:positionId
});
export const promotion = (positionId) => ({
    type:PROMOTION,
    positionId:positionId
})
export const undo = () => ({
    type:UNDO
})
export const reset = () => ({
    type:RESET
})
export const quit = (kind) => ({
    type:QUIT,
    kind:kind
})
export const errMsgClear = () => ({
    type:ERR_MSG_CLEAR
})

//초기상태
const initialState = {
    cells:[],
    boardContext:[],
    movePath:[],
    matchContext:null,
    promotionContext:null,
    gameToken:null,
    playerKey:null,
    player:{},
    active:null,
    errMessage:null,
    lastMoveId:null,
};

//리듀서
function board(state = initialState, action){
    // const ajax = getAjax('/play')
    let ajax =  getAjax('/play_'+state.playType)
    switch(action.type){
        case SETUP:
            ajax = getAjax('/play_'+action.playType)
            ajax.requestGame({status:'start',gameToken:action.gameToken})
            const setupResult = ajax.getRespnoseGame();
            return {...initialState,
                    playType:action.playType,
                    ...setupResult,
                    lastMoveId:null};
        case RELOAD:
            ajax.requestGame({status:'reload',gameToken:action.gameToken});
            const reloadResult = ajax.getRespnoseGame()
            return {...state,
                    ...reloadResult
                };
        case SELECT:
            ajax.requestGame({status:'select',gameToken:state.gameToken,playerKey:state.playerKey,selectedPositionId:action.positionId});
            const selectResult = ajax.getRespnoseGame();
            try{
                if(selectResult.message){
                    throw selectResult.message
                }
                return {...state,...selectResult, errMessage:null}
            }catch(err){
                if(['ThereIsAnyPieceException',
                    'NotSelectInactivePieceException',
                    'NotMoveOutOfPathException',
                    'NotMovePlayerException',
                    'NotInTwoPlayerException'].includes(err)){
                        return {...state, errMessage:err}
                }else{
                    throw err;
                }
            }
        case PROMOTION:
            ajax.requestGame({status:'promotion',gameToken:state.gameToken,playerKey:state.playerKey,selectedPositionId:action.positionId})
            const promotionResult = ajax.getRespnoseGame();
            return {...state,...promotionResult};
        case UNDO:
            ajax.requestGame({status:'undo',gameToken:state.gameToken})
            const undoResult = ajax.getRespnoseGame();
            return {...state,...undoResult,movePath:[]}
        case RESET:
            ajax.requestGame({status:'reset',gameToken:state.gameToken})
            const resetResult = ajax.getRespnoseGame();
            return {...state,...resetResult};
        case QUIT:
            ajax.requestGame({status:'quit',gameToken:state.gameToken,playerKey:state.playerKey,kind:action.kind})
            return {...initialState};
        case ERR_MSG_CLEAR:
            return {...state, errMessage:null}
        default:
            return state;
    }
}

export default board;