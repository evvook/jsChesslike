import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as resultActions from '../modules/result';
import * as boardActions from '../modules/board';
import './Result.css'
import { useNavigate } from "react-router-dom";

const Result = ({result}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const dialog = useRef()

    useEffect(()=>{
        if(result && dialog.current && !dialog.current.open){
            dialog.current.showModal();
        }
    },[result]);

    const click = () => {
        dispatch(resultActions.clear());
        dispatch(boardActions.reset())
        dialog.current.close();

    };

    const moveOut = () => {
        dispatch(resultActions.clear());
        dispatch(boardActions.quit('moveOut'))
        dialog.current.close();
        navigate('/');
    }

    return (
        <dialog className="resultModal" ref={dialog}>
            <div>{
                result?(result.status === 'checkmate'||'giveUp'?result.win+'이(가) 이겼습니다':'비겼습니다'):undefined
            }</div>
            <div className="container">
                {useSelector(state=>state.boardData.playType)==='single' && <div className='button reset' onClick={click}>초기화</div>}
                <div className="button moveOut" onClick={moveOut}>나가기</div>
            </div>
        </dialog>
    )
}

export default Result;