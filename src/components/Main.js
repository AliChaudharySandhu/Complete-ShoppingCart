// from feature 1 new//
import React from 'react'
import Data from '../data/data.json'
import Products from './Products';
class Main extends React.Component {

    constructor(){
        super();
        this.state = {
            products : Data.products,
            size : "",
            sort : ""
        }
    }

    render(){

        return (
            <div className="container-fluid cart__main">
                <div class="row mt-5">
                    <div className="col-8 cart__container">
                        <Products products={this.state.products} />
                    </div>
                    <div className="col-4 4cart__sidebar">
                        Cart Items
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
