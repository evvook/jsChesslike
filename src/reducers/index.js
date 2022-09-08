import * as types from '../actions/ActionTypes';
import * as view from '../chesslike/drawView.mjs'
import * as game from '../chesslike/chessGame.mjs'

const initialState = initState();

function initState(){
    const state = {}
    const manager = game.gameManager();
    const boardData = view.makeBoard(manager.getBoardAxis().RANK,manager.getBoardAxis().FILE);
    const flatBoardData = boardData.flatMap((rank)=>rank);

    state.manager = manager;
    state.cells = flatBoardData;
    state.gameContext = manager.getGameContext();

    return state;
}

function setBoard(state = initialState, action){
    switch(action.type){
        case types.SELECT:
            return {
                ...state,
                movePath:action.path
                
            }
        case types.UNSELECT:
            return {
                ...state,
                movePath:action.path
            }
        case types.MOVE:
            return {
                ...state,
                movePath:action.path,
                gameContext:action.gameContext
            }
        default:
            return state;
    }
}

export default setBoard;