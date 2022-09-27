import GameContainer from "./GameContainer";
import ListContainer from "./ListContainer";
import {Routes,Route} from 'react-router-dom';
import SingleGameContainer from "./SingleGameContainer";

function App(){
    return(
        <Routes>
            <Route path="/" element={<ListContainer/>}/>
            <Route path="/game/:gameToken/" element={<GameContainer/>}/>
            <Route path="/game/single/" element={<SingleGameContainer/>}/>
        </Routes>
    )
}

export default App;