import React, { Component } from 'react'
import Fade from "react-reveal/Fade"
import { connect } from "react-redux";
import Modal from "react-modal"
import { removeFromCart } from "../actions/cartActions";
import { createOrder , clearOrder } from "../actions/orderActions";
import Zoom from "react-reveal/Zoom";

class Cart extends Component {

        
        constructor(props){
                super(props);
                this.state ={

                    showCheckoutForm : false,
                    name : "" ,
                    email :"" ,
                    address : "",
                    
                };

            }


        handleInput = (e) =>{
                this.setState({[e.target.name] : e.target.value })
        }




        closeModal = () => {
                this.props.clearOrder();
              };





        createOrder = (e) => {
                e.preventDefault()
                const order = {
                        name : this.state.name ,
                        email : this.state.email ,
                        address : this.state.address ,
                        cartItems : this.props.cartItems ,
                         total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),

                }
                // console.log(order);
                this.props.createOrder(order);

        }



        render() {
                const { cartItems , order } = this.props

                return (
                        <div>
                                
                        { 
                        cartItems.length === 0?(
                                <div className="cart cart-header" >Cart is Empty</div>
                        ) : (
                                <div className="cart cart-header" >
                                        You have {cartItems.length} in the cart
                                </div>

                        )
                        }


                                <div className="cart">
                                        <Fade left cascade>
                                        <ul className="cart-items">
                                                {cartItems.map((x) =>(
                                                        <li key={x._id}>
                                                                <div>
                                                                        <img src={x.image}></img>
                                                                </div>
                                                                <div>
                                                                        {x.title}
                                                                </div>


                                                                <div className="right" >
                                                                        {x.price} x {x.count}
                                                                        <button onClick={ () => this.props.removeFromCart(x)}>
                                                                                Remove
                                                                        </button>
                                                                </div>
                                                                
                                                        </li>
                                                ))}
                                        </ul>
                                        </Fade>
                                </div>
                        



                                {cartItems.length !== 0 && (
                                        <div className="cart" >
                                        <div className="total">Total
                                                {" "}{" "}
                                                <div>{"  $"}{Math.round(cartItems.reduce((a,c) => a + c.price * c.count , 0)*100)/100}</div>
                                        </div>

                                        <button onClick={() => {this.setState({showCheckoutForm : true})} } className="button primary" >Proceed</button>
                                </div>
                                )

                                }









{order && (
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
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
                    <div>$(order.total)</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems.map((x) => (
                        <div>
                          {x.count} {" x "} {x.title}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
)}






                                

                        {this.state.showCheckoutForm && cartItems.length !== 0 && (
                                <div>
                                        
                                <div className="cart">
                                        <form onSubmit={this.createOrder} method="POST" >
                                        <Fade right cascade>

                                                <ul className="form-container">
                                                        <li>
                                                                <label>Name</label>
                                                                <input name="name" type="text" required onChange={this.handleInput}></input>
                                                                <label>Email</label>
                                                                <input name="email" type="email" required onChange={this.handleInput}></input>
                                                                <label>Address</label>
                                                                <input name="address" type="text" required onChange={this.handleInput}></input>
                                                        </li>
                                                        <li>
                                                                <button className="button primary" type="submit" >Checkout</button>
                                                        </li>
                                                </ul>

                                        </Fade>
                                        </form>
                        
                                </div>

                                </div>
                        )

                        }







                        </div>
                )
        }
}






export default connect(
        (state) => ({
          cartItems: state.cart.cartItems,
          order : state.order.order

        })

        ,
        {removeFromCart , createOrder , clearOrder}
        



)(Cart);

