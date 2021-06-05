import React, { Component } from 'react'
import Fade from "react-reveal/Fade"
import Modal from "react-modal"
import Zoom from "react-reveal/Zoom"
import { connect } from "react-redux";
import { fetchProducts , openModal } from "../actions/productActions";
import { addToCart , removeFromCart } from "../actions/cartActions";


class Products extends Component {


        constructor(props){
                super(props);
                this.state ={

                
                    x : false 
                    
                };
            }


        componentDidMount(){
                this.props.fetchProducts()
        }



        openModal = (x) => {
                this.setState ({ x })
        }


        closeModal = () => {
                this.setState({x : null})
        }



        

        render() {

                const {x} = this.state
                
                return (
                        <div>   
                                <Fade bottom cascade>


                                
                                
                                { !this.props.products ? (<div>Loading...</div>) :

                                
                                (


                                        




                                <ul className="products">


                                        {this.props.products.map((x) =>(
                                                <li key={x._id}>
                                                        <div className="product">
                                                                <a href= {  '#' + x._id} >
                                                                        <img src={x.image} onClick={ () => {this.openModal(x)} } alt={ x._id}></img>
                                                                        <p> {x.title} </p>
                                                                </a>

                                                        </div>

                                                        <div className="product-price" >
                                                                <div>${x.price}</div>
                                                                <button onClick={ () => this.props.addToCart(x) } className="button primary">Add to Cart</button>

                                                        </div>
                                                </li>
                                        ))}
                                </ul>

                                )

                                
                                
                                
                                }





                                </Fade>


                                <Fade bottom cascade>

                                        <li className="products" >
                                        { this.props.word &&  (this.props.products.length===0) &&
                                        ( <h1
                                         style={{marginTop : "100px" , marginBottom : "100px" }}> no results for  {this.props.word} 
                                        </h1> ) }
                                        </li>

                                </Fade>


                                


                                <button onClick={()=>{alert(this.props.real)}}>click me</button>


                                { x && (
                                        <Modal isOpen ={true} onRequestClose = {this.closeModal} >
                                                <Zoom>
                                                        <button className="close-modal" onClick = {this.closeModal} >X</button>
                                                <div className="product-details">
                                                        <img src={x.image} alt={x.title}></img>
                                                        <div className="product-details-description">
                                                        <p>
                                                        <strong>{ x.title}</strong>
                                                        </p>
                                                        <p>{ x.description}</p>
                                                        <p>
                                                        Avaiable Sizes:{" "}
                                                        { x.availableSizes.map((a) => (
                                                        <span>
                                                                {" "}
                                                                <button className="button">{a}</button>
                                                        </span>
                                                        ))}
                                                        </p>
                                                        <div className="product-price">
                                                        <div>{(x.price)}</div>
                                                        <button
                                                        className="button primary"
                                                        onClick={() => {
                                                                this.props.addToCart(x);
                                                                this.closeModal();
                                                        }}
                                                        >
                                                        Add To Cart
                                                        </button>
                                                        </div>
                                                        </div>
                                                </div>
                                                </Zoom>

                                        </Modal>
                                )}


                                
                                
                        </div>
                )
        }
}

export default connect(
        
        (state) => ({ 

                products: state.products.filteredItems ,
                word: state.products.word ,
                real : state.products.real ,
        
        
        }),
        {
          fetchProducts,openModal,addToCart
        }

)(Products);
