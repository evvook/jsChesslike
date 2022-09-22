import { useParams } from "react-router-dom";
import BoardContainer from "./BoardContainer"
import getAjax from "../utils/ajax";
import { useDispatch } from "react-redux";
import * as boardActions from '../modules/board'

const GameContainer = () => {

    const params = useParams();
    let gameToken = params.gameToken;
    if(gameToken === 'none'){
        const ajax = getAjax('/setup')
        ajax.request({},function(result){
            gameToken = result.gameToken;
        },false)
    }
    const dispath = useDispatch();
    dispath(boardActions.setup(gameToken));
    return(
        <BoardContainer gameToken={gameToken}></BoardContainer>
    )
}

export default GameContainer;