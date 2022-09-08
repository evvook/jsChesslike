import './Cell.css';

function Cell(props){

    const color = props.movePath?(props.onPiece==='EMPTY'?props.movePath.colors.path:props.movePath.colors.enermy):props.color;
    const style = { 
        backgroundColor:color
    }

    function click(e){
        
        props.manager.selectPosition(e.target.id)
        const movePath = props.manager.getMovePath();
        if(movePath.length>0){
            props.onSelect(movePath);
        }else{
            if(props.movePath && props.movePath.notation === e.target.id){
                props.onMove(props.manager.getGameContext());
            }else{
                props.onUnselect();
            }
        }

    }
    return(
        <div className="cell" id={props.id} style={style} onClick={click}>{props.onPiece.specialChar}</div>
    );
}

export default Cell;