import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message"
import * as messageActions from '../modules/message';
import * as boardActions from '../modules/board'

const MessageContainer = ({errMessage}) => {

    const dispatch = useDispatch()
    useEffect(()=>{
        if(errMessage){
            dispatch(boardActions.errMsgClear())
            dispatch(messageActions.set(errMessage));
        }
    },[errMessage])
    
    const message = useSelector(state=>state.messageData.message)
    return (
        <Message message={message}></Message>
    )
}

export default MessageContainer;