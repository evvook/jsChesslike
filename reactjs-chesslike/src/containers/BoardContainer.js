import Board from '../components/Board';
import Promotion from '../components/Promotion';
import Buttons from '../components/Buttons';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as boardActions from '../modules/board'
import useInterval from '../utils/hooks';

import MessageContainer from './MessageContainer';
import ResultContainer from './ResultContainer';

const BoardContainer = () => {
    const boardData = useSelector(state=>state.boardData,shallowEqual);
    
    const dispatch = useDispatch();
    
    useInterval(()=>{
        dispatch(boardActions.reload(boardData.gameToken))
    },500)
    
    return(
        <div>
            <MessageContainer errMessage={boardData.errMessage}/>
            <ResultContainer matchContext={boardData.matchContext}/>
            <Promotion {...boardData}/>
            <Board {...boardData}/>
            <Buttons playType={boardData.playType} />
        </div>        
    )
}

export default BoardContainer;