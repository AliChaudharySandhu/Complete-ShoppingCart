import {CREATE_ORDER, CLEAR_CART, CLEAR_ORDER} from '../redux/Actions'

const OrderReducer = (state = {}, action) =>{
    if(action.type === CREATE_ORDER){
        return {
            order: action.payload
        }
    }
    else if(action.type === CLEAR_ORDER){
        return {
            order: null,
        }
    }
    else {
        return state
    }
}

export default OrderReducer;