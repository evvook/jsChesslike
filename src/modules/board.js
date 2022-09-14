import * as view from '../chesslike/drawView.mjs'
import * as game from '../chesslike/chessGame.mjs'

//액션타입
const SELECT = 'board/SELECT';
const MOVE = 'board/MOVE';

//액션 생성 함수
export const select = (path) => ({
    type:SELECT,
    path:path
});
export const move = (boardContext) => ({
    type:MOVE,
    path:[],
    boardContext:boardContext
});

//초기상태
const initialState = initState();

function initState(){
    const state = {}
    const manager = game.gameManager(game.standardGameSetter);
    // const manager = game.gameManager(game.stalemateGameSetter);
    const boardData = view.makeBoard(manager.getBoardAxis().RANK,manager.getBoardAxis().FILE);
    const flatBoardData = boardData.flatMap((rank)=>rank);

    state.manager = manager;
    state.cells = flatBoardData;
    state.boardContext = manager.getGameContext().boardContext;

    return state;
}

//리듀서
function board(state = initialState, action){
    switch(action.type){
        case SELECT:
            return {
                ...state,
                movePath:action.path
                
            }
        case MOVE:
            return {
                ...state,
                movePath:action.path,
                boardContext:action.boardContext
            }         
        default:
            return state;
    }
}

export default board;