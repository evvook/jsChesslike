import Board from '../components/Board';
import { connect } from 'react-redux';
import * as boardActions from '../modules/board'
import * as messageActions from '../modules/message'
import * as promotionActions from '../modules/promotion'

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
    onSelect: (movePath) => dispatch(boardActions.select(movePath)),
    onMove: (boardContext) => {
        dispatch(boardActions.move(boardContext))
    },
    //message액션
    onSetMessage: (message) => dispatch(messageActions.set(message)),
    onClearMessage: () => dispatch(messageActions.clear()),

    onShowPromotions: (promotions) => dispatch(promotionActions.show(promotions)),
    onClearPromotions : () => dispatch(promotionActions.clear()),
})

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer;