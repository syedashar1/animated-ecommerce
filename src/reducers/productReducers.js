import { FETCH_PRODUCTS ,ORDER_PRODUCTS_BY_PRICE , FILTER_PRODUCTS_BY_SIZE ,OPEN_MODAL ,SEARCHED_PRODUCTS } from "../types";
      


export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        filteredItems: action.payload.items,
      };


    case SEARCHED_PRODUCTS :
      return {
        ...state , 
        filteredItems : action.payload.filterItems , 
        word : action.payload.word
      }


    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
        real : true 
      };

    case OPEN_MODAL :
      return{
        modal : action.payload
      }
    case FETCH_PRODUCTS:
      return { items: action.payload , filteredItems : action.payload };
    default:
      return state;
  }
};