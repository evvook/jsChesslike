import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as resultActions from '../modules/result';
import * as boardActions from '../modules/board';
import './Result.css'

const Result = () => {
    const dispatch = useDispatch()
    const dialog = useRef()

    const {result} = useSelector(state=>state.resultData);
    const {manager} = useSelector(state=>state.boardData);

    if(result !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }

    const click = () => {
        dispatch(resultActions.clear());
        manager.reset();
        dispatch(boardActions.lay(manager.getGameContext().boardContext));
        dialog.current.close();
    };

    return (
        <dialog ref={dialog}>
            <div>{
                result?(result.status === 'checkmate'?result.win+'이(가) 이겼습니다':'비겼습니다'):undefined
            }</div>
            <div className="container">
                <div className='reset' onClick={click}>초기화</div>
            </div>
        </dialog>
    )
}

export default Result;