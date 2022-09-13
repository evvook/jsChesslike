import Board from '../components/Board';
import Message from '../components/Message';
import Promotion from '../components/Promotion';
import Buttons from '../components/Buttons';

const BoardContainer = (props) => {

    return(
        <div>
            <Message>{props.message}</Message>
            <Promotion/>        
            <div className="background">
                <Board/>
            </div>
            <Buttons></Buttons>
        </div>        
    )
}

export default BoardContainer;