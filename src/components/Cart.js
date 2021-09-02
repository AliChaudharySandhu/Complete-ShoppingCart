import React, { Component } from 'react'
import './cart.css'
import { formateCurrency, formateTotal } from './utils'

export class Cart extends Component {
    render() {
        const { cart } = this.props

        return (
            <>
                <div className=" cart_header mt-3 pb-3 border-bottom border-1 border-secondary">
                    {cart.length === 0 ? <div> Cart is Empty </div> :
                        <div>You have {cart.length} itmes in cart</div>
                    }
                </div>
                <div className="cart-container">
                    <ul className="cartItems list-unstyled">
                        {cart.map((item) => {
                            return <li key={item._id} className=" cartitem d-flex flex-sm-column flex-lg-row justify-content-between align-items-center p-2 m-1">
                                <div className=''>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="offset-lg-2 offset-md-1">

                                </div>
                                <div className="flex-grow-1 justify-content-evenly">
                                    <div>{item.title}</div>
                                    <div className="d-flex mt-2 align-items-center justify-content-between">
                                        <div>{item.count} x ${item.price} = {formateTotal(item.count, item.price)}</div>
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                    </div>
                                </div>


                            </li>
                        })}
                    </ul>
                </div>

                {cart.length > 0 &&
                    <div className="cart_total border-top border-1 border-dark  p-2 d-flex justify-content-end align-items-center">
                        <span className="mx-2 text-dark fw-bold">Total : {formateCurrency(cart.reduce((a, c) => {
                            return a += (c.count * c.price)
                        }, 0))}</span>
                        <button className="btn btn-md btn-warning text-white">Proceed</button>
                    </div>
                }

            </>
        )
    }
}

export default Cart
