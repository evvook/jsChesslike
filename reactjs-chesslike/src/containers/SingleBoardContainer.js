import Board from '../components/Board';
import Promotion from '../components/Promotion';
import Buttons from '../components/Buttons';
import { shallowEqual, useSelector } from 'react-redux';

import MessageContainer from './MessageContainer';
import ResultContainer from './ResultContainer';

const SingleBoardContainer = () => {
    
    const boardData = useSelector(state=>state.boardData,shallowEqual);

    return(
        <div>
            <MessageContainer errMessage={boardData.errMessage}/>
            <ResultContainer matchContext={boardData.matchContext}/>
            <Promotion {...boardData}/>
            <Board {...boardData}/>
            <Buttons playType={boardData.playType}></Buttons>
        </div>        
    )
}

export default SingleBoardContainer;