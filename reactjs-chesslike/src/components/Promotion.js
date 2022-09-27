import React,{useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import "./Promotion.css"

import * as boardActions from '../modules/board'

function Promotion({promotionContext,active,player,playerKey}){

    const dispatch = useDispatch();

    const dialog = useRef()
    useEffect(()=>{
        if(!dialog.current?.open && promotionContext?.length > 0 && player[active] === playerKey){
            dialog.current.showModal();
        }
    },[promotionContext])
    
    const click = (event) => {
        dispatch(boardActions.promotion(event.target.id));
        dialog.current.close();
    }

    return (
        <dialog className="promotionModal" ref={dialog}>
            <div className="container">
                {
                    promotionContext?promotionContext.map(
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