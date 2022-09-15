import React, {useRef} from "react";
import { useDispatch } from "react-redux";

import './Message.css';
import * as messageActions from '../modules/message'

function Message(props){

    const dispatch = useDispatch()

    const dialog = useRef()
    if(props.children !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }

    const click = () => {
        dispatch(messageActions.clear());
        dialog.current.close();
    };
    
    return (
        <dialog className="messageModal" ref={dialog} onClick={click}>{props.children}</dialog>
    )
}

export default Message;