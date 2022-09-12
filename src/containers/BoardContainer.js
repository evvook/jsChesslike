import Board from '../components/Board';
import * as actions from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        //board 리듀서
        cells:state.boardData.cells,
        boardContext:state.boardData.boardContext,
        manager:state.boardData.manager,
        movePath:state.boardData.movePath,
        //message 리듀서
        message:state.messageData.message,
        //promotion 리듀서
        promotions:state.promotionData.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
    //board액션
    onSelect: (movePath) => dispatch(actions.select(movePath)),
    onMove: (boardContext) => {
        dispatch(actions.move(boardContext))
    },
    //message액션
    onMessage: (message) => dispatch(actions.message(message)),
    onClear: () => dispatch(actions.clear()),

    onPromotion: (promotions) => dispatch(actions.promotion(promotions)),
    onPClear : () => dispatch(actions.pClear()),
})

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer;