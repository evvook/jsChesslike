import React,{useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Promotion.css"

import * as boardActions from '../modules/board'
import * as promotionActions from '../modules/promotion'

function Promotion(){

    const promotions = useSelector(state=>state.promotionData.promotions);
    const manager = useSelector(state=>state.boardData.manager);
    const dispatch = useDispatch();

    const dialog = useRef()
    if(promotions !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }
    
    const click = (event) => {
        manager.promotion(event.target.id);
        const gameContext = manager.getGameContext();
        dispatch(boardActions.move(gameContext.boardContext));
        dispatch(promotionActions.clear())
        dialog.current.close();
    }

    return (
        <dialog ref={dialog}>
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