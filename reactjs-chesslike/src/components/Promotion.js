import React,{useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Promotion.css"

import * as boardActions from '../modules/board'
import * as promotionActions from '../modules/promotion'
import * as resultActions from '../modules/result'

function Promotion(){

    const promotions = useSelector(state=>state.promotionData.promotions);
    const {ajaxRequest, gameToken} = useSelector(state=>state.boardData);
    const dispatch = useDispatch();

    const dialog = useRef()
    if(promotions !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }
    
    const click = (event) => {
        ajaxRequest({status:'promotion',gameToken,selectedPositionId:event.target.id},function(result){
            const gameContext = result.gameContext;
            const matchContext = gameContext.matchContext;
            dispatch(promotionActions.clear())
            dialog.current.close();
    
            if(matchContext.status === 'ongoing'){
                dispatch(boardActions.lay(gameContext.boardContext));
            }else{
                dispatch(resultActions.set(matchContext))
            }
        },true)

    }

    return (
        <dialog className="promotionModal" ref={dialog}>
            <div className="container">
                {
                    promotions?promotions.map(
                        promotion => <div className="promotions" key={promotion.notation} id={promotion.notation} onClick={click}>
                                        {promotion.specialChar}
                                     </div>
                    ):undefined
                }
            </div>
        </dialog>
    )
}

export default Promotion;