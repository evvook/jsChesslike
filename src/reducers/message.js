import * as types from '../actions/ActionTypes';

const initialState = {
    message:undefined
}

const message = (state = initialState, action) => {
    switch(action.type){
        case types.MESSAGE:
            return {
                ...state,
                message:action.message
            }
        case types.CLEAR:
            return {
                ...state,
                message:action.message
            }   
        default:
            return state;
    }
}

export default message;