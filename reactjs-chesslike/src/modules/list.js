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
            const loadData = {...state}
            const ajax = getAjax('/list')

            ajax.request({},function(result){
                loadData.list = result;
            },false)
            return loadData;
        default:
            return state;
    }
}

export default list;