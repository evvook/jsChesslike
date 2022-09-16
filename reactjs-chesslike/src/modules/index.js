import { combineReducers } from "redux";

import board from "./board";
import message from "./message";
import promotion from "./promotion";
import result from "./result";

const reducers = combineReducers({
    boardData: board,
    messageData : message,
    promotionData : promotion,
    resultData : result
});

export default reducers;