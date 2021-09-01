import React, { Component } from 'react'

export class Filter extends Component {
    render() {
        return (
            <div className="filter d-flex justify-content-between my-3 pb-3 border-1 border-bottom border-secondary">
                <div className="filter_results">{this.props.count} Products</div>
                <div className="filter_sort">Filter
                    <select value={this.props.sort} onChange={this.props.sortFilter}>
                        <option value="">Latest</option>
                        <option value="lowest">Lowest</option>
                        <option value="highest">Highest</option>        


                    </select>
                </div>
                <div className="filter_sizes">Order
                    <select value={this.props.size} onChange={this.props.sizeFilter}>
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

export default Filter
