import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './redux/AppReducer';
import CartReducer from './redux/CartReducer';


const initialState = {
    
}



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
    products: AppReducer,
    cart: CartReducer
}),
 initialState,
 composeEnhancer(applyMiddleware(thunk))
);

export default store;