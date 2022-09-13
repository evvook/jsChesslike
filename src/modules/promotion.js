const SHOW = 'promotion/SHOW'
const CLEAR = 'promotion/CLEAR'

export const show = (promotions) => ({
    type:SHOW,
    promotions:promotions
})
export const clear = () => ({
    type:CLEAR,
    promotions:undefined
})

const initialState = {
    promotions:undefined
}

const promotion = (state = initialState, action) => {
    switch(action.type){
        case SHOW:
            return {
                ...state,
                promotions:action.promotions
            }
        case CLEAR:
            return {
                ...state,
                promotions:action.promotions
            }   
        default:
            return state;
    }
}

export default promotion;