import { combineReducers } from "redux";

import board from "./board";
import message from "./message";
import promotion from "./promotion";
import result from "./result";
import list from "./list";

const reducers = combineReducers({
    boardData: board,
    messageData : message,
    promotionData : promotion,
    resultData : result,
    listData : list
});

export default reducers;