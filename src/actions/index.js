import * as types from './ActionTypes';

export const select = (path) => ({
    type:types.SELECT,
    path:path
});
export const move = (boardContext) => ({
    type:types.MOVE,
    path:[],
    boardContext:boardContext
});


export const message = (message) => ({
    type:types.MESSAGE,
    message:message
})
export const clear = () => ({
    type:types.CLEAR,
    messgae:undefined
})


export const promotion = (promotions) => ({
    type:types.PROMOTION,
    promotions:promotions
})
export const pClear = () => ({
    type:types.P_CLEAR,
    promotions:undefined
})