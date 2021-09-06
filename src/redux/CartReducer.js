import {REMOVE_FROM_CART, ADD_TO_CART, CLEAR_ORDER } from './Actions';

// localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : 

const CartReducer = (state = {cartItems: JSON.parse(localStorage.getItem("cartItems") || '[]') }, action) =>{

    if(action.type === CLEAR_ORDER){
        return {
            cartItems: []
        }
    }
    if(action.type === ADD_TO_CART){
        return {
            cartItems: action.payload.cartItems
        }
            
    }
    else if(action.type === REMOVE_FROM_CART){
        return{
            cartItems: action.payload.cartItems
        }
    } else {
        return state
    }
    // switch(action.type){
    //     case ADD_TO_CART:
    //         return{
    //             cartItems: action.payload.cartItems
    //         }
    //     case REMOVE_FROM_CART:
    //         return {
    //             cartItems: action.payload.cartItems
    //         }
    //     default :
    //         return {
    //             state
    //         }
    // }
}
export default CartReducer;