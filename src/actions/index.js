import * as types from './ActionTypes';

export const select = (path) => ({
    type:types.SELECT,
    path:path
});
export const move = (gameContext) => ({
    type:types.MOVE,
    path:[],
    gameContext:gameContext
});


export const message = (message) => ({
    type:types.MESSAGE,
    message:message
})
export const clear = () => ({
    type:types.CLEAR,
    messgae:undefined
})