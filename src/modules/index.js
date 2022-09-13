import { combineReducers } from "redux";

import board from "./board";
import message from "./message";
import promotion from "./promotion";

const reducers = combineReducers({
    boardData: board,
    messageData : message,
    promotionData : promotion
});

export default reducers;