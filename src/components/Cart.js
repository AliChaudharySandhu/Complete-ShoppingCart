import React, { Component } from 'react'
import './cart.css'
import { formateCurrency, formateTotal } from './utils'
import Fade from 'react-reveal/Fade'

export class Cart extends Component {
    constructor() {
        super()
        this.state = {
            showCheckOut: false,
            name: '',
            email: '',
            address: '',
            error: ''

        }
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state.name)
    }
    createOrder = (e) =>{
        e.preventDefault();

        if(this.state.name && this.state.email && this.state.address){

            let order ={
                name : this.state.name,
                email : this.state.email,
                address : this.state.address,
                cart : this.props.cart
            }
        this.props.createOrder(order)
        } else{
            this.setState({error: 'Something is missing !'})
        }

    }

    render() {
        const { cart } = this.props

        return (
            <>
                <div className=" cart_header mt-3 pb-3 border-bottom border-1 border-secondary">
                    {cart.length === 0 ? <div> Cart is Empty </div> :
                        <div className="mb-1">You have {cart.length} itmes in cart</div>
                    }
                </div>
                <div className="cart-container">
                    <Fade left cascade>
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
                    </Fade>
                </div>

                {cart.length > 0 &&
                    <div className="cart_total border-top border-1 border-dark  p-2 d-flex justify-content-end align-items-center">
                        <span className="mx-2 text-dark fw-bold">Total : {formateCurrency(cart.reduce((a, c) => {
                            return a += (c.count * c.price)
                        }, 0))}</span>
                        
                        <button className={`btn btn-md btn-warning text-white ${this.state.showCheckOut? 'opacity-0' : ''} `}
                            onClick={() => this.setState({ showCheckOut: true })}
                        >Proceed</button>
                    </div>
                }
                {(cart.length > 0 && this.state.showCheckOut) && 
                <Fade right cascade>
                <div>
                    <form action="" className="mt-5">
                        <h4 className="text-dark text-center my-4">Fill the form to Proceed !</h4>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-md-2 col-form-label">Name</label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Your name"
                                    className="form-control"
                                    onChange={this.handleInput}
                                />

                            </div>
                        </div>
                        <div className="form-group row my-3">
                            <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
                            <div className="col-md-10">
                                <input
                                    type="email"
                                    name="emali"
                                    required
                                    placeholder="email@example.com"
                                    className="form-control"
                                    onChange={this.handleInput}
                                />

                            </div>
                        </div>
                        <div className="form-group row my-3 mb-1">
                            <label htmlFor="address" className="col-md-2 col-form-label">Address</label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Your Address"
                                    className="form-control"
                                    onChange={this.handleInput}
                                />

                            </div>
                        </div>
                        {this.state.error && <p style={{fontSize: '12px', textAlign: 'end'}} className="text-danger m-0 offset-2">{this.state.error}</p> }
                        <button type="submit" className="btn btn-md btn-warning text-white offset-2 px-4 mt-3"
                            onClick={(e) => this.createOrder(e)}
                        >Checkout</button>

                    </form>
                </div>
                </Fade>
                }

            </>
        )
    }
}

export default Cart
