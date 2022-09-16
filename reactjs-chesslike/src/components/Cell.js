import { useDispatch, useSelector } from 'react-redux';
import './Cell.css';
import * as boardActions from '../modules/board';
import * as messageActions from '../modules/message';
import * as promotionActions from '../modules/promotion';
import * as resultActions from '../modules/result';

function Cell(props){

    const {ajaxRequest,gameToken} = useSelector(state=>state.boardData);
    const dispatch = useDispatch();

    function click(e){
        ajaxRequest({status:'select',gameToken:gameToken,selectedPositionId:e.target.id},function(result){
            try{
                if(result.message){
                    throw result.message;
                }
                if(props.movePath){
                    const gameContext = result.gameContext;
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
                    dispatch(boardActions.select(result.pathContext));
                }
            }catch(err){
                if(err === 'ThereIsAnyPieceException'){
                    dispatch(messageActions.set('선택한 위치에 기물이 없습니다.'))
                }else if(err === 'NotSelectInactivePieceException'){
                    dispatch(messageActions.set('선택할 수 없는 기물입니다.'))
                }else if(err === 'NotMoveOutOfPathException'){
                    dispatch(messageActions.set('수를 둘 수 없는 위치 입니다.'))
                }else{
                    throw err;
                }
            }
        },true)
        
    }
    return(
        <div className="cell" id={props.id} style={{backgroundColor:props.color}} onClick={click}>{props.children}</div>
    );
}

export default Cell;