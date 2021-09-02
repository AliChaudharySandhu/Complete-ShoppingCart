// from feature 1 new//
import React from 'react'
import Data from '../data/data.json'
import Products from './Products';
import Filter from './Filter'
class Main extends React.Component {

    constructor(){
        super();
        this.state = {
            products : Data.products,
            size : "",
            sort : ""
        }
        this.handleSort = this.handleSort.bind(this)
        this.handleSize = this.handleSize.bind(this)
    }
    handleSort (e){
        const value = e.target.value;
        this.setState((state) =>({
            sort: value,
            products: state.products.slice().sort((a,b) =>{

                if(value === 'lowest'){
                    return a.price - b.price
                }
                if(value === 'highest'){
                    return b.price - a.price
                }else {
                    return a._id - b._id
                }
                // value === "lowest"?
                // ((a.price < b.price)? 1 : -1):
                // value === "highest"?
                // ((a.price > b.price)? 1 : -1):
                // ((a._id > b._id)? 1 : -1)

            })
        })
        )}
    handleSize(e){
        if(e.target.value === ''){
            this.setState({products : Data.products})
        }else {
            this.setState({
                size : e.target.value,
                products : Data.products.filter((product)=>{
                    return product.availableSizes.indexOf(e.target.value) >= 0
                })
            })
        }

    }

    render(){

        return (
            <div className="container-fluid cart__main">
                <div className="row">
                    <div className="col-8 cart__container">
                        <Filter 
                            count={this.state.products.length}
                            size={this.state.size}
                            sort={this.state.sort}
                            sortFilter={this.handleSort}
                            sizeFilter={this.handleSize}
                        />
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
