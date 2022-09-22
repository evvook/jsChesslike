import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as resultActions from '../modules/result';
import * as boardActions from '../modules/board';
import './Result.css'
import { useNavigate } from "react-router-dom";

const Result = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const dialog = useRef()

    const {result} = useSelector(state=>state.resultData);
    const {gameToken,playerKey} = useSelector(state=>state.boardData);

    if(result !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }

    const click = () => {
        dispatch(resultActions.clear());
        dialog.current.close();

        dispatch(boardActions.reset(gameToken))
    };

    const moveOut = () => {
        dispatch(resultActions.clear());
        dialog.current.close();
        dispatch(boardActions.quit(gameToken,playerKey,'moveOut'))
        navigate('/');
    }

    return (
        <dialog className="resultModal" ref={dialog}>
            <div>{
                result?(result.status === 'checkmate'||'giveUp'?result.win+'이(가) 이겼습니다':'비겼습니다'):undefined
            }</div>
            <div className="container">
                {/*<div className='button reset' onClick={click}>초기화</div>*/}
                <div className="button moveOut" onClick={moveOut}>나가기</div>
            </div>
        </dialog>
    )
}

export default Result;