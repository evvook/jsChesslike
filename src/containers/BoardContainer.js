import Board from '../components/Board';
import Message from '../components/Message';
import Promotion from '../components/Promotion';
import Buttons from '../components/Buttons';
import { useSelector } from 'react-redux';
import Result from '../components/Result';

const BoardContainer = () => {

    return(
        <div>
            <Message>{useSelector(state=>state.messageData.message)}</Message>
            <Result/>
            <Promotion/>        
            <div className="background">
                <Board/>
            </div>
            <Buttons></Buttons>
        </div>        
    )
}

export default BoardContainer;