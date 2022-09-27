import { useDispatch } from "react-redux";
import getAjax from "../utils/ajax";
import SingleBoardContainer from "./SingleBoardContainer"
import * as boardActions from '../modules/board'
import { useEffect } from "react";

const SingleGameContainer = () => {
    
    
    const dispath = useDispatch();
    
    useEffect(()=>{
        let gameToken = null;
        const ajax = getAjax('/setup_single')
        ajax.request({},function(result){
            gameToken = result.gameToken;
        },false);

        dispath(boardActions.setup(gameToken,'single'));
    })
    return(
        <SingleBoardContainer></SingleBoardContainer>
    )
}

export default SingleGameContainer;