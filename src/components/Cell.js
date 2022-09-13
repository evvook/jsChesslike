import './Cell.css';

function Cell(props){

    function click(e){
        try{
            props.manager.selectPosition(e.target.id)
            if(props.movePath){
                const gameContext = props.manager.getGameContext();
                props.onMove(gameContext.boardContext);
                
                const promotionContext = gameContext.promotionContext;
                if(promotionContext){
                    props.onShowPromotions(promotionContext);
                }
            }else{
                props.onSelect(props.manager.getMovePath());
            }
        }catch(err){
            props.onSetMessage(err);
        }
        
    }
    return(
        <div className="cell" id={props.cellId} style={{backgroundColor:props.color}} onClick={click}>{props.children}</div>
    );
}

export default Cell;