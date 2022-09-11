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

