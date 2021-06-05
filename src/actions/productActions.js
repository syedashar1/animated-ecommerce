import { FETCH_PRODUCTS } from "../types"
import { FILTER_PRODUCTS_BY_SIZE } from "../types"
import { ORDER_PRODUCTS_BY_PRICE } from "../types"
import { OPEN_MODAL , SEARCHED_PRODUCTS } from "../types"

export const fetchProducts = () => async (dispatch) => {
       const res = await fetch("/api/products")

       const data = await res.json()

       dispatch({
               type : FETCH_PRODUCTS , 
               payload : data ,
       })
}


export const openModal = (x) => async (dispatch) => {
        dispatch({
                type : OPEN_MODAL ,
                payload : x
        })
}


export const searchProducts = (word) => async (dispatch , getState ) => {
        

        //always the total items 

        const products = getState().products.items

        console.log(products);

        
        dispatch({

                type : SEARCHED_PRODUCTS , 
                payload : {
                        word : word ,
                        filterItems:
                                word === "" ? products : 
                                products.filter((x) => x.title.toLowerCase().indexOf(word.toLowerCase()) >= 0),
                }

        })
}



export const filterProducts = (products, size) => (dispatch) => {

        dispatch({
          type: FILTER_PRODUCTS_BY_SIZE,
          payload: {
            size: size,
            items:
              size === "ALL" ? products : 
              products.filter((x) => x.availableSizes.indexOf(size) >= 0),
        },
});
};


export const sortProducts = (filteredProducts, sort) => (dispatch) => {
        const sortedProducts = filteredProducts.slice();
        if (sort === "latest") {
                sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
        } 
        else 
        {
                sortedProducts.sort((a, b) => sort === "lowest"
                ? a.price > b.price
                ? 1
                : -1
                : a.price > b.price
                ? -1
                : 1
                );
        }
                console.log(sortedProducts);




                dispatch({
                        type: ORDER_PRODUCTS_BY_PRICE,
                        payload: {
                        sort: sort,
                        items: sortedProducts
                                 },
                });
};