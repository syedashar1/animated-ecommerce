import Products from '../components/Products';
import Filter from '../components/Filter';
import Cart from '../components/Cart';
import React, { Component } from 'react'

export default class HomeScreens extends Component {
        render() {
                return (
                        <div>
                                <div className="content">

                                        <div className="main"> 
                                        <Filter></Filter>
                                        <Products />
                                        </div>

                                        <div className="sidebar">
                                        <Cart ></Cart>
                                        </div>

                                        </div>
                        </div>
                )
        }
}
