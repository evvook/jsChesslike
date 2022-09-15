import { useDispatch, useSelector } from 'react-redux';
import './Cell.css';
import * as boardActions from '../modules/board';
import * as messageActions from '../modules/message';
import * as promotionActions from '../modules/promotion';
import * as resultActions from '../modules/result';

function Cell(props){

    const {manager} = useSelector(state=>state.boardData);
    const dispatch = useDispatch();

    function click(e){
        try{
            manager.selectPosition(e.target.id)
            if(props.movePath){
                const gameContext = manager.getGameContext();
                dispatch(boardActions.lay(gameContext.boardContext))
                
                const promotionContext = gameContext.promotionContext;
                if(promotionContext){
                    dispatch(promotionActions.show(promotionContext));
                }

                const matchContext = gameContext.matchContext;
                if(matchContext.status !== 'ongoing'){
                    dispatch(resultActions.set(matchContext))
                }
            }else{
                dispatch(boardActions.select(manager.getMovePath()));
            }
        }catch(err){
            dispatch(messageActions.set(err))
        }
        
    }
    return(
        <div className="cell" id={props.id} style={{backgroundColor:props.color}} onClick={click}>{props.children}</div>
    );
}

export default Cell;