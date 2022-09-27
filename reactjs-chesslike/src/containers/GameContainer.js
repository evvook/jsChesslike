import { useParams } from "react-router-dom";
import BoardContainer from "./BoardContainer"
import getAjax from "../utils/ajax";
import { useDispatch } from "react-redux";
import * as boardActions from '../modules/board'
import { useEffect } from "react";

const GameContainer = () => {

    const params = useParams();
    const dispath = useDispatch();
    
    useEffect(()=>{
        let gameToken = params.gameToken;
        if(gameToken === 'none'){
            const ajax = getAjax('/setup')
            ajax.request({},function(result){
                gameToken = result.gameToken;
            },false)
        }
        dispath(boardActions.setup(gameToken,'multi'));
    })
    return(
        <BoardContainer></BoardContainer>
    )
}

export default GameContainer;