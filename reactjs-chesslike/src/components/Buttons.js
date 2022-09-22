import { useDispatch, useSelector } from 'react-redux';
import './Buttons.css'
import * as boardActions from '../modules/board'
import { useNavigate } from 'react-router-dom';
import getAjax from '../utils/ajax';

function Buttons(){

    const navigate = useNavigate();
    const {gameToken,playerKey} = useSelector(state=>state.boardData);
    const dispatch = useDispatch();

    const undo = () => {
        const ajax = getAjax('/play');
        ajax.request({status:'undo',gameToken:gameToken},(result)=>{
            dispatch(boardActions.lay((result.gameContext.boardContext)));
        },true);
    }
    const moveOut = () => {
        dispatch(boardActions.quit(gameToken,playerKey,'quit'))
        navigate('/');
    }

    return (
        <div className='container'>
            {/*<div className="button undo" onClick={undo}>실행취소</div>*/}
            <div className="button moveOut" onClick={moveOut}>나가기</div>
        </div>
    )
}

export default Buttons;