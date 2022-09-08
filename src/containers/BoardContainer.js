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
    onSelect: (movePath) => {
        for(let idx in movePath){
            movePath[idx].colors = {path:'#FFE4B5',enermy:'#F4A460'};
        }
        dispatch(actions.select(movePath))
    },
    onUnselect: () => dispatch(actions.unselect()),
    onMove: (gameContext) => {
        dispatch(actions.move(gameContext))
    }
})

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer;