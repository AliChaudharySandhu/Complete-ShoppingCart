import React, { Component } from 'react'
import './cart.css'
import { formateCurrency, formateTotal } from './utils'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import {removeFromCart, createOrder, clearOrder} from '../redux/Actions'
class Cart extends Component {
    constructor(props) {
        super(props)
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
        // console.log(this.state.name)
        // console.log(this.state.email)
        // console.log(this.state.address)

    }
    createOrder = (e) =>{
        e.preventDefault();

        if(this.state.name && this.state.email && this.state.address){

            const order ={
                name : this.state.name,
                email : this.state.email,
                address : this.state.address,
                cart : this.props.cart,
                total : this.props.cart.reduce((a,c) => a += c.count * c.price, 0)
            }
        this.props.createOrder(order)
    }else{
        this.setState({error: 'Something is missing !'})

    }

    }
    closemodal = () =>{
        this.props.clearOrder();
    }

    render() {
        console.log(this.props.cart)
        const {order} = this.props;
        return (
            <>
                <div className=" cart_header mt-3 pb-3 border-bottom border-1 border-secondary">
                    {this.props.cart.length === 0 ? <div> Cart is Empty </div> :
                        <div className="mb-1">You have {this.props.cart.length} itmes in cart</div>
                    }
                </div>
                {order && (
                    <Modal isOpen={true} onRequestClose={this.closemodal}>
                        <Zoom>  
                            <div className="order_detail d-flex flex-column justify-content-center">
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-outline-warning btn-sm p-2 lh-0" onClick={this.closemodal}>x</button>
                                </div>
                                <div className="mt-lg-5 mt-md-3 mt-2 d-flex flex-column align-items-center">
                                    <h3 className="success_message">Your Order has been placed !</h3>
                                    <h5 className="order_detail mb-3">Tracking Id: <span className="text-info fs-6 fw-light text-lowercase">{order._id}</span></h5>
                                    <ul className="order_ul list-unstyled d-flex flex-column">
                                        <li>
                                            <div>Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div>{formateCurrency(order.total)}</div>
                                        </li>
                                        <li>
                                            <div>Items:</div>
                                            <div>{order.cart && order.cart.map(x =>(
                                                <div>
                                                    {x.count} {'x'} {x.title}
                                                </div>
                                            ))}</div>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </Zoom>
                    </Modal>
                )

                }

                <div className="cart-container">
                    <Fade left cascade>
                    <ul className="cartItems list-unstyled">
                        {this.props.cart?.map((item) => {
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

                {this.props.cart.length > 0 &&
                    <div className="cart_total border-top border-1 border-dark  p-2 d-flex justify-content-end align-items-center">
                        <span className="mx-2 text-dark fw-bold">Total : {formateCurrency(this.props.cart.reduce((a, c) => {
                            return a += (c.count * c.price)
                        }, 0))}</span>
                        
                        <button className={`btn btn-md btn-warning text-white ${this.state.showCheckOut? 'opacity-0' : ''} `}
                            onClick={() => this.setState({ showCheckOut: true })}
                        >Proceed</button>
                    </div>
                }
                {(this.props.cart.length > 0 && this.state.showCheckOut) && 
                <Fade right cascade>
                <div>
                    <form onSubmit={this.createOrder} className="mt-5">
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
                                    name="email"
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
                        <button type=
                        'submit' className="btn btn-md btn-warning text-white offset-2 px-4 mt-3"
                        >Checkout</button>

                    </form>
                </div>
                </Fade>
                }

            </>
        )
    }
}

export default connect((state) => ({
    cart: state.cart.cartItems,
    order: state.order.order
}),{
    removeFromCart,
    createOrder,
    clearOrder
}
)(Cart)
