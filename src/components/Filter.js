import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    sizeFilter,
    sortFilter
} from '../redux/Actions'

class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (<div>Loading... </div>):
            (<div className="filter d-flex justify-content-between my-3 pb-3 border-1 border-bottom border-secondary">
                <div className="filter_results">{this.props.filteredProducts.length} Products</div>
                <div className="filter_sort d-flex align-items-center">Filter
                    <select className="form-select form-select-sm mx-2" value={this.props.sort} onChange={(e) => this.props.sortFilter(this.props.filteredProducts, e.target.value)}>
                        <option value="latest">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>        


                    </select>
                </div>
                <div className="filter_sizes d-flex align-items-center">Order
                    <select  className="form-select form-select-sm mx-2" value={this.props.size} onChange={(e) => this.props.sizeFilter(this.props.producuts, e.target.value)}>
                        <option value="">All</option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>

                    </select>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    size: state.products.size,
    sort: state.products.sort,
    producuts: state.products.items,
    filteredProducts: state.products.filteredItems
    }),
    {
        sizeFilter,
        sortFilter
    }
)(Filter);
