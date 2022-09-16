const SET = 'result/SET';
const CLEAR = 'result/CLEAR';

export const set = (result) => ({
    type:SET,
    result:result
})
export const clear = () => ({
    type:CLEAR,
    result:undefined
})

const initialState = {
    result:undefined
}

const result = (state = initialState, action) => {
    switch(action.type){
        case SET:
            return {
                ...state,
                result:action.result
            }
        case CLEAR:
            return {
                ...state,
                result:action.result
            }   
        default:
            return state;
    }
}

export default result;