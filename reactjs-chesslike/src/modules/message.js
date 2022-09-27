const SET = 'message/SET';
const CLEAR = 'message/CLEAR';

export const set = (message) => ({
    type:SET,
    message:message
})
export const clear = () => ({
    type:CLEAR,
    messgae:undefined
})

const initialState = {
    message:undefined
}

const message = (state = initialState, action) => {
    switch(action.type){
        case SET:
            let message;
            if(action.message === 'ThereIsAnyPieceException'){
                message = '선택한 위치에 기물이 없습니다.';
            }else if(action.message === 'NotSelectInactivePieceException'){
                message = '선택할 수 없는 기물입니다.';
            }else if(action.message === 'NotMoveOutOfPathException'){
                message = '수를 둘 수 없는 위치 입니다.';
            }else if(action.message === 'NotMovePlayerException'){
                message = '차례가 아닙니다.';
            }else if(action.message === 'NotInTwoPlayerException'){
                message = '게임 상대가 없습니다.';
            }
            return {
                ...state,
                message:message
            }
        case CLEAR:
            return {
                ...state,
                message:action.message
            }   
        default:
            return state;
    }
}

export default message;