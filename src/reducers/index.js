import { combineReducers } from "redux";

import board from "./board";
import message from "./message";

const reducers = combineReducers({
    boardData: board,
    messageData : message
});

export default reducers;