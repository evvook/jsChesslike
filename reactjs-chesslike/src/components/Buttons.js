import { useDispatch } from 'react-redux';
import './Buttons.css'
import * as boardActions from '../modules/board'
import { useNavigate } from 'react-router-dom';

function Buttons({playType}){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const undo = () => {
        dispatch(boardActions.undo())
    }
    const moveOut = () => {
        dispatch(boardActions.quit('quit'))
        navigate('/');
    }

    return (
        <div className='container'>
        <div className="button moveOut" onClick={moveOut}>나가기</div>
        {playType==='single'?<div className="button undo" onClick={undo}>실행취소</div>:undefined}
        </div>
    )
}

export default Buttons;