import React, { Component } from 'react'
import './products.css'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import {formateCurrency} from './utils'

export class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        }
    }
    openModal = (product) => {
        this.setState({ product: product })
    }
    closeModel = () => {
        this.setState({ product: null })
    }
    render() {
        const product  = this.state.product
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="products d-inline-flex flex-wrap list-unstyled justify-content-between">
                        {this.props.products.map((product) => {
                            return (
                                <li className="mb-5 px-2" key={product._id}>
                                    <div className="product">
                                        <a className="text-capitalize text-dark" href={"#" + product._id}
                                            onClick={() => this.openModal(product)}
                                        >
                                            <img src={product.image} alt={product.name} />
                                            <p className="mt-2 text-truncate">{product.title}</p>
                                        </a>
                                        <div className="product_price d-flex flex-row align-items-center justify-content-between">
                                            <p className="mb-0 mx-3">${product.price}</p>
                                            <button onClick={() => this.props.addToCart(product)} className="btn btn-md btn-warning text-white">Add To Cart</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </Fade>
                {product && <Modal isOpen={true} onRequestClose={this.closeModel}>
                    <Zoom>
                        <div className="product_modal">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-outline-warning btn-sm p-2 lh-0" onClick={this.closeModel}>x</button>
                            </div>

                            <div className="product_details row">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <img src={product.image} alt={product.title} />
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 mt-md-5 mt-sm-2 mt-2">
                                    <p>{product.title}</p>
                                    <p>{product.description}</p>
                                    <p>Available Sizes
                                        {product.availableSizes.map((item) => {
                                            return (
                                            <span>
                                                <button>{item}</button>
                                            </span>)
                                        })}
                                    </p>
                                    <div className="product_price d-flex flex-row align-items-center mt-5">
                                    <div>{formateCurrency(product.price)}</div>
                                    <button className="btn btn-md btn-warning text-white fw-bold mx-5"
                                        onClick={() =>{
                                            this.props.addToCart(product)
                                            this.closeModel();   
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                                </div>
                                
                            </div>
                        </div>
                    </Zoom>
                </Modal>}
            </div>
        )
    }
}

export default Products
