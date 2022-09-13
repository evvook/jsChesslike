import React, {useRef} from "react";

function Message(props){

    const dialog = useRef()
    if(props.children !== undefined && dialog.current && !dialog.current.open){
        dialog.current.showModal();
    }

    const click = () => {
        props.onClearMessage();
        dialog.current.close();
    };
    
    return (
        <dialog ref={dialog} onClick={click}>{props.children}</dialog>
    )
}

export default Message;