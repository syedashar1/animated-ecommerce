import React, { Component } from 'react'
import { connect } from "react-redux";
import { filterProducts, sortProducts , searchProducts } from "../actions/productActions";


class Filter extends Component {


        handleInput = (e) =>{
                this.setState({ [e.target.name] : e.target.value })
                this.props.searchProducts( e.target.value )
                
        }








render() {
        return ( 
                
                !this.props.filteredProducts ? ( <div>Loading...</div> ) :
                (<div className="filter" >

                        <div>
                                <form >
                                        <input  className="filter-search" name="search" type="text" placeholder="Search" onChange={this.handleInput}></input>
                                </form>
                        </div>

                        <div className="filer-result">{this.props.filteredProducts.length} Products</div>
                        {/* { this.props.word && (this.props.filteredProducts.length===0) && ( <div> no results for  {this.props.word} </div> ) } */}
                        <div className="filer-sort"> Order {" "}
                        
                        <select value={this.props.sort} onChange={(e)=> this.props.sortProducts( this.props.filteredProducts , e.target.value )}>
                                <option value="latest">Latest</option>
                                <option value="lowest">Lowest</option>
                                <option value="highest">Highest</option>
                                
                        </select> </div>
                        <div className="filer-size"> Filter  {" "}
                        
                        <select value={this.props.size} onChange={(e)=> this.props.filterProducts( this.props.products , e.target.value )}>
                                <option value="ALL">ALL</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                        </select> 
                        </div>
                </div>)
        )
        }
}


// this is taking products which is always total products

export default connect(
        (state) => ({
          size: state.products.size,
          sort: state.products.sort,
          products: state.products.items,
          filteredProducts: state.products.filteredItems,
          word: state.products.word,
        })
        
        ,


        {
          filterProducts,
          sortProducts,
          searchProducts
        }


)(Filter);