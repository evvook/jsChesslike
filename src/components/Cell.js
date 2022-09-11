import './Cell.css';

function Cell(props){

    function click(e){
        try{
            props.manager.selectPosition(e.target.id)
            if(props.movePath){
                props.onMove(props.manager.getGameContext());
            }else{
                props.onSelect(props.manager.getMovePath());
            }
        }catch(err){
            props.onMessage(err);
        }
        
    }
    return(
        <div className="cell" id={props.cellId} style={{backgroundColor:props.color}} onClick={click}>{props.children}</div>
    );
}

export default Cell;