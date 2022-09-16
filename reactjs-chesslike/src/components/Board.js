import './Board.css';
import Cell from './Cell';
import {useSelector} from 'react-redux';

function Board(){
    const {cells,boardContext,movePath} = useSelector(state=>state.boardData);

    const colors = {path:'#FFE4B5',enermy:'#F4A460'};
    const cellList = cells.map((cell)=>{
        const cellContext = _find(boardContext,_compare(cell.id));
        const cellMovePath = _find(movePath,_compare(cell.id));
        const cellColor = cellMovePath?(cellContext.onPiece === 'EMPTY'?colors.path:colors.enermy):cell.color;
        
        return <Cell key={cell.id}
                     id={cell.id} 
                     color={cellColor} 
                     movePath={cellMovePath} 
                     >
                    {cellContext.onPiece.specialChar}
                </Cell>
    })

    return(
        <div className="board">
            {cellList}
        </div>
    )
}

const _find = (arr,comapare) => {
    if(arr == null){
        return null;
    }else{
        const foundCell = arr.find(el=>comapare(el,'notation'));
        if(foundCell){
            return foundCell;
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