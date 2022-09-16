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
            return {
                ...state,
                message:action.message
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