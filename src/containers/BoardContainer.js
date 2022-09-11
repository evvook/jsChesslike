import Board from '../components/Board';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        cells:state.cells,
        gameContext:state.gameContext,
        manager:state.manager,
        movePath:state.movePath
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSelect: (movePath) => dispatch(actions.select(movePath)),
    onMove: (gameContext) => {
        dispatch(actions.move(gameContext))
    }
})

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer;