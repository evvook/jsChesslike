import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useInterval from '../utils/hooks';
import "./ListContainer.css"
import * as listActions from '../modules/list'

const ListContainer = () => {
    const navigate = useNavigate();

    function click(){
        navigate('/game/none');
    }
    function itemClick(e){
        navigate('/game/'+e.target.textContent);
    }

    const dispatch = useDispatch();
    useInterval(()=>{
        dispatch(listActions.load())
    },500)

    const listData = useSelector(state=>state.listData.list);
    const list = [];
    list.push(...listData.map((obj)=>{
        return <li className="list" key={obj.id} value={obj.id} onClick={itemClick}>{obj.id}</li>
    }));

    return(
        <div>
            <div className="listContainer">
                <div className="newGame" onClick={click}>새 게임</div>
            </div>
            <ul>
                {list}
            </ul>
        </div>
    )
}

export default ListContainer;