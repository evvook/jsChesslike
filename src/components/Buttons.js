import { useDispatch, useSelector } from 'react-redux';
import './Buttons.css'
import * as boardActions from '../modules/board'

function Buttons(){

    const manager = useSelector(state=>state.boardData.manager);
    const dispatch = useDispatch();

    const click = () => {
        manager.undo();
        dispatch(boardActions.move((manager.getGameContext().boardContext)));
    }

    return (
        <div className='container'>
            <div className="undo" onClick={click}>실행취소</div>
        </div>
    )
}

export default Buttons;