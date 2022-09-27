import React, {useEffect, useRef} from "react";
import { useDispatch } from "react-redux";

import './Message.css';
import * as messageActions from '../modules/message';

function Message({message}){

    const dispatch = useDispatch()

    const dialog = useRef()
    useEffect(()=>{
        if(message && dialog.current && !dialog.current.open){
            dialog.current.showModal();
        }
    },[message])
    
    const click = () => {
        dispatch(messageActions.clear());
        dialog.current.close();
    };
    
    return (
        <dialog className="messageModal" ref={dialog} onClick={click}>{message}</dialog>
    )
}

export default Message;