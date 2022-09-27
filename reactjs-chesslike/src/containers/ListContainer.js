import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useInterval from '../utils/hooks';
import "./ListContainer.css"
import * as listActions from '../modules/list'

const ListContainer = () => {
    const navigate = useNavigate();

    function newGame(){
        navigate('/game/none');
    }
    function singleGame(){
        navigate('/game/single');
    }
    function itemClick(e){
        navigate('/game/'+e.target.textContent);
    }

    const dispatch = useDispatch();
    useInterval(()=>{
        dispatch(listActions.load())
    },500)

    const list = [...useSelector(state=>state.listData.list).map((obj)=>
        <li className="list" key={obj.id} value={obj.id} onClick={itemClick}>{obj.id}</li>
    )];

    return(
        <div>
            <div className="listContainer">
                <div className="newGame" onClick={newGame}>새 게임</div>
                <div className="newGame" onClick={singleGame}>혼자하기</div>
            </div>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default ListContainer;