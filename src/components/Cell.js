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
            if(err.message === 'ThereIsAnyPieceException'){
                dispatch(messageActions.set('선택한 위치에 기물이 없습니다.'))
            }else if(err.message === 'NotSelectInactivePieceException'){
                dispatch(messageActions.set('선택할 수 없는 기물입니다.'))
            }else if(err.message === 'NotMoveOutOfPathException'){
                dispatch(messageActions.set('수를 둘 수 없는 위치 입니다.'))
            }else{
                throw err;
            }
        }
        
    }
    return(
        <div className="cell" id={props.id} style={{backgroundColor:props.color}} onClick={click}>{props.children}</div>
    );
}

export default Cell;