import './Board.css';
import Cell from './Cell';

function Board({cells,boardContext,movePath,lastMoveId,gameToken,active,player,playType}){

    const pathColors = {empty:'#FFE4B5',piece:'#F4A460'};
    const cellList = cells.map((cell)=>{
        const cellContext = _find(boardContext,_compare(cell.id));
        const cellMovePath = _find(movePath,_compare(cell.id));
        const cellColor = cellMovePath?(cellContext.onPiece === 'EMPTY'?pathColors.empty:pathColors.piece):cell.color;
        
        return <Cell key={cell.id}
                     id={cell.id} 
                     color={cellColor} 
                     movePath={cellMovePath}
                     append={cell.id===lastMoveId?' lastMove':''}
                     >
                    {cellContext.onPiece.specialChar}
                </Cell>
    })

    return(
        <div>
            <div className="background">
            {
                playType==='multi' && <div className="code">게임코드 : {gameToken}</div>
            }
                <div className={'player'+(active==='white'?' active':'')}>white : {player?.white}</div>
                <div className={'player'+(active==='black'?' active':'')}>black : {(player?.black)?player.black:"미참여"}</div>
                <div className="board">
                    {cellList}
                </div>
            </div>
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