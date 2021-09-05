const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
const FILTER_PRODUCTS_BY_SIZE = 'FILTER_PRODUCTS_BY_SIZE';
const ORDER_PRODUCTS_BY_Price = "ORDER_PRODUCTS_BY_Price"
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'


//===================== Action Creators ==============================

//=============Products Action Creators ==============
const fetchProducts = () => async(dispatch) =>{
    const res = await fetch('http://localhost:8080/api/products');
    const data = await res.json();
    console.log(data)
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data 
    })
}

const sizeFilter = (products, size) => (dispatch) =>{
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload:{
            size: size,
            items: size === "" 
            ? products
            : products.filter((x) => x.availableSizes.indexOf(size) >= 0), 
        },
    })
}
const sortFilter = (filteredItems, sort) => dispatch =>{
    const sortedProducts = filteredItems.slice()

    if(sort === "latest"){
        sortedProducts.sort((a,b) =>{
            return a._id - b._id
        })
    }else if(sort === 'lowest'){
        sortedProducts.sort((a,b) =>{
            return a.price - b.price
        })
    }else if(sort === 'highest'){
        sortedProducts.sort((a,b) =>{
            return b.price - a.price 
        })
    }
        
    
    dispatch({
        type: ORDER_PRODUCTS_BY_Price,
        payload: {
             sort: sort,
             items: sortedProducts
        }
    })
}


//=============Cart Action Creators ==============

const addToCart = (product) => (dispatch, getState) =>{
    // console.log(getState().cart)
    // console.log(getState().cart.cartItems   )

    // const cart = localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): []
    const cartItems =  getState().cart.cartItems ? getState().cart.cartItems.slice() : [];
    let alreadyExist = false;
    cartItems.forEach((x) =>{
        if(x._id === product._id){
            alreadyExist = true;
            x.count++
        }
    });
    if(!alreadyExist){
        cartItems.push({...product, count : 1});
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {cartItems}
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

const removeFromCart = (product) => (dispatch, getState) =>{
    
    const cart = getState().cart.cartItems.slice()
    const cartItems = cart.filter(item => item._id !== product._id)

    dispatch({
        type: REMOVE_FROM_CART,
        payload: {cartItems}
    })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

export {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_SIZE,
    ORDER_PRODUCTS_BY_Price,
    REMOVE_FROM_CART,
    ADD_TO_CART,
    sizeFilter,
    fetchProducts,
    sortFilter,
    addToCart,
    removeFromCart
}