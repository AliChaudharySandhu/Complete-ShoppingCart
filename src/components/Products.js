import React, { Component } from 'react'
import './products.css'

export class Products extends Component {
    constructor(props){
        super();

    }
    render() {
        return (
            <div>
                <ul className="products d-inline-flex flex-wrap list-unstyled justify-content-between">
                    {this.props.products.map((product) =>{
                        return(
                            <li className="mb-5 px-2" key={product._id}>
                                <div className="product">
                                    <a className="text-capitalize text-dark" href={"#" + product._id}>
                                        <img src={product.image} alt={product.name}/>
                                        <p className="mt-2 text-truncate">{product.title}</p>
                                    </a>
                                    <div className="product_price d-flex flex-row align-items-center justify-content-between">
                                        <p className="mb-0 mx-3">${product.price}</p>
                                        <button className="btn btn-md btn-warning text-white">Add To Cart</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default Products
