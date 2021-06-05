import React , {useEffect , useState} from 'react';
import {BrowserRouter as Router , Switch , Route , Link, BrowserRouter } from 'react-router-dom' ;
import "./main.css"
import store from "./store"
import {Provider} from "react-redux"
import HomeScreen from "./screens/HomeScreens";
import AdminScreen from "./screens/AdminScreens";



class App extends React.Component {





    render(){

        return(
            <Provider store={store}>
                <BrowserRouter>
                            <div className='App' >
    
                                <div className = "grid-container">
                                    <header> 
                                        <Link to="/">React Shopping Cart</Link>
                                        <Link to="/admin">Admin</Link>
                                    </header>

                                    <main>

                                    <Route path="/admin" component={AdminScreen} />
                                    <Route path="/" component={HomeScreen} exact />

                                    </main>
                                    <footer>  All rights Reserved. </footer>
                                </div>
                    
                            </div>
                
                
                </BrowserRouter>


            </Provider>
    
    
          )

    }


}


export default App;
 