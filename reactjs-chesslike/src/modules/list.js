import getAjax from "../utils/ajax";

const LOAD = 'list/LOAD';

export const load = () => ({
    type:LOAD
})

const initialState = {
    list:[]
}

const list = (state = initialState, action) => {
    switch(action.type){
        case LOAD:
            const ajax = getAjax('/list')

            ajax.requestList();
            const listState = ajax.getResponseList();
            return {...state,list:listState};
        default:
            return state;
    }
}

export default list;