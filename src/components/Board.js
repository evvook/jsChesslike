import './Board.css';
import Cell from "./Cell";
import Message from "./Message";
import Buttons from "./Buttons";
import Promotion from "./Promotion";

function Board({cells,boardContext,movePath,manager,message,promotions,onSelect,onMove,onMessage,onClear,onPromotion,onPClear}){

    const colors = {path:'#FFE4B5',enermy:'#F4A460'};

    const cellList = cells.map((cell)=>{
        const cellContext = _filter(boardContext,_compare(cell.id));
        const cellMovePath = _filter(movePath,_compare(cell.id));
        const cellColor = cellMovePath?(cellContext.onPiece === 'EMPTY'?colors.path:colors.enermy):cell.color;
        
        return <Cell key={cell.id}
                     cellId={cell.id} 
                     color={cellColor} 
                     movePath={cellMovePath} 
                     manager={manager} 
                     onSelect={onSelect} 
                     onMove={onMove}
                     onMessage={onMessage}
                     onPromotion={onPromotion}
                     >
                    {cellContext.onPiece.specialChar}
                </Cell>
    })

    return(
        <div>
            <div className="background">
                <Message onClear={onClear}>{message}</Message>
                <Promotion onPClear={onPClear} promotions={promotions} manager={manager} onMove={onMove}></Promotion>
                <div className="board">
                    {cellList}
                </div>
            </div>
            <Buttons manager={manager} onMove={onMove}></Buttons>
        </div>
    )
}

const _filter = (arr,comapare) => {
    if(arr == null){
        return null;
    }else{
        const filteredArr = []
        filteredArr.push(...arr.filter(el=>comapare(el,'notation')));
        if(filteredArr.length>0){
            return filteredArr[0];
        }else{
            return null;
        }
    }
}

const _compare = (cond) =>{
    return (obj, key) => {
        return obj[key] === cond;
    }
}

export default Board;