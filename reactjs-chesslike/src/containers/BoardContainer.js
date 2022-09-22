import Board from '../components/Board';
import Message from '../components/Message';
import Promotion from '../components/Promotion';
import Buttons from '../components/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import Result from '../components/Result';
import * as boardActions from '../modules/board'
import * as resultActions from '../modules/result'
import useInterval from '../utils/hooks';

import './BoardContainer.css';

const BoardContainer = ({gameToken}) => {
    
    const dispath = useDispatch();

    useInterval(()=>{
        dispath(boardActions.reload(gameToken))
    },500)
    
    const matchContext = useSelector(state=>state.boardData.matchContext);
    if(matchContext?.status !== 'ongoing'){
        dispath(resultActions.set(matchContext))
    }

    const {white,black} = useSelector(state=>state.boardData.player);
    const active = useSelector(state=>state.boardData.active);
    const playerWhite = 'player'+(active==='white'?' active':'');
    const playerBlack = 'player'+(active==='black'?' active':'');

    return(
        <div>
            <Message>{useSelector(state=>state.messageData.message)}</Message>
            <Result/>
            <Promotion/>
            <div className="background">
                <div className="code">게임코드 : {gameToken}</div>
                <div className={playerWhite}>white : {white}</div>
                <div className={playerBlack}>black : {black?black:"미참여"}</div>
                <Board/>
            </div>
            <Buttons></Buttons>
        </div>        
    )
}

export default BoardContainer;