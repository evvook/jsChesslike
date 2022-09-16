import { useDispatch, useSelector } from 'react-redux';
import './Buttons.css'
import * as boardActions from '../modules/board'

function Buttons(){

    const {ajaxRequest,gameToken} = useSelector(state=>state.boardData);
    const dispatch = useDispatch();

    const click = () => {
        ajaxRequest({status:'undo',gameToken:gameToken},(result)=>{
            dispatch(boardActions.lay((result.gameContext.boardContext)));
        },true);
    }

    return (
        <div className='container'>
            <div className="undo" onClick={click}>실행취소</div>
        </div>
    )
}

export default Buttons;