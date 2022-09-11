import Cell from "./Cell";
import './Board.css';


function Board({cells,gameContext,movePath,manager,onSelect,onMove}){

    const cellList = cells.map((cell)=>{
        const cellContext = _filter(gameContext,_compare(cell.id));
        const cellMovePath = _filter(movePath,_compare(cell.id));
        const cellColor = cellMovePath?(cellContext.onPiece === 'EMPTY'?'#FFE4B5':'#F4A460'):cell.color;
        
        return <Cell key={cell.id} {...cell} {...cellContext} color={cellColor}
                    movePath={cellMovePath} manager={manager} onSelect={onSelect} onMove={onMove}>
                    {cellContext.onPiece.specialChar}
                </Cell>
    })

    return(
        <div className="background">
            <div className="board">
                {cellList}
            </div>
        </div>
    )
}

const _filter = (arr,comapare) => {
    const filteredArr = []
    if(arr == null){
        return null;
    }else{
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