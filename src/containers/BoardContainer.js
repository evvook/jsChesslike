import Board from '../components/Board';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        //board 리듀서
        cells:state.boardData.cells,
        gameContext:state.boardData.gameContext,
        manager:state.boardData.manager,
        movePath:state.boardData.movePath,
        //message 리듀서
        message:state.messageData.message
    }
}

const mapDispatchToProps = (dispatch) => ({
    //board액션
    onSelect: (movePath) => dispatch(actions.select(movePath)),
    onMove: (gameContext) => {
        dispatch(actions.move(gameContext))
    },
    //message액션
    onMessage: (message) => dispatch(actions.message(message)),
    onClear: () => dispatch(actions.clear())
})

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer;