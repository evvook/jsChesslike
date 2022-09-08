import Cell from "./Cell";
import './Board.css';


function Board({cells,gameContext,movePath,manager,onSelect,onUnselect,onMove}){

    return(
        <div className="background">
            <div className="board">
            {
                cells.map((cell)=>{
                    const cellContexts = gameContext.filter(cContext=>cContext.notation === cell.id);
                    const cellContext = cellContexts.length>0?cellContexts[0]:{};

                    const cellMovePaths = movePath!=null?movePath.filter(cPath=>cPath.notation === cell.id):[];
                    const cellMovePath = cellMovePaths.length>0?cellMovePaths[0]:null;
                    
                    return <Cell key={cell.id} {...cell} {...cellContext} 
                                movePath={cellMovePath} manager={manager} onSelect={onSelect} onUnselect={onUnselect} onMove={onMove}></Cell>
                })
            }
            </div>
        </div>
    )
}

export default Board;