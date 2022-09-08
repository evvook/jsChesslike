import * as types from './ActionTypes';

export const select = (path) => ({
    type:types.SELECT,
    path:path
});
export const unselect = () =>({
    type:types.UNSELECT
});
export const move = (gameContext) => ({
    type:types.MOVE,
    gameContext:gameContext
});

