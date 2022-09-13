import { connect } from 'react-redux';
import * as boardActions from '../modules/board'
import * as messageActions from '../modules/message'
import * as promotionActions from '../modules/promotion'

import Board from '../components/Board';
import Message from '../components/Message';
import Promotion from '../components/Promotion';
import Buttons from '../components/Buttons';

const BoardContainer = (props) => {

    const {onClearMessage,message,onClearPromotions,promotions,manager,onMove} = props;
    return(
        <div>
            <Message onClearMessage={onClearMessage}>{message}</Message>
            <Promotion onClearPromotions={onClearPromotions} promotions={promotions} manager={manager} onMove={onMove}/>        
            <div className="background">
                <Board {...props}/>
            </div>
            <Buttons manager={manager} onMove={onMove}></Buttons>
        </div>        
    )
}

export default connect(
    (state)=>({
        //mapStateToProps
        //board 리듀서
        cells:state.boardData.cells,
        boardContext:state.boardData.boardContext,
        manager:state.boardData.manager,
        movePath:state.boardData.movePath,
        //message 리듀서
        message:state.messageData.message,
        //promotion 리듀서
        promotions:state.promotionData.promotions
    }),
    (dispatch)=>({
        //mapDispatchToProps
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
)(BoardContainer)