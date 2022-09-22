import GameContainer from "./GameContainer";
import ListContainer from "./ListContainer";
import {Routes,Route} from 'react-router-dom';

function App(){
    return(
        <Routes>
            <Route path="/" element={<ListContainer/>}/>
            <Route path="/game/:gameToken/" element={<GameContainer/>}/>
        </Routes>
    )
}

export default App;