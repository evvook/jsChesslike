import React,{useRef} from "react";
import "./Promotion.css"

function Promotion(props){

    const dialog = useRef()
    if(props.promotions !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }
    
    const click = (event) => {
        props.manager.promotion(event.target.id);
        const gameContext = props.manager.getGameContext();
        props.onMove(gameContext.boardContext);
        props.onPClear();
        dialog.current.close();
    }

    return (
        <dialog ref={dialog}>
            <div className="container">
                {props.promotions?props.promotions.map(promotion=>
                        <div className="promotions" key={promotion.notation} id={promotion.notation} onClick={click}>{promotion.specialChar}</div>
                    ):undefined}
            </div>
        </dialog>
    )
}

export default Promotion;