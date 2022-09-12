import * as types from '../actions/ActionTypes';

const initialState = {
    promotions:undefined
}

const promotion = (state = initialState, action) => {
    switch(action.type){
        case types.PROMOTION:
            return {
                ...state,
                promotions:action.promotions
            }
        case types.P_CLEAR:
            return {
                ...state,
                promotions:action.promotions
            }   
        default:
            return state;
    }
}

export default promotion;