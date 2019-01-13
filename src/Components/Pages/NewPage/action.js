import axios from 'axios';
import * as api_url from '../../Apis/api';

export const DASHBOARD_COUNTS = 'dashboard_counts';
export const ALL_STOCKS_DATA = "all_stocks_data";
export const STOCK_DATA = 'stock';
export const ACCESSTOKEN = "generate_access_token"
export const ADD_STOCK = "add_stock"
export const TRANSACTION_HISTORY = "transaction_history"
export const START_AMOUNT = "start_amount"
const ROOT_URL = api_url.API_URL;

export const getDashboard_Counts = () => (dispatch) =>{

    axios.get(`${ROOT_URL}dashboard_counts`).then(function(response){
       console.log('response',response);
       dispatch({
           type: DASHBOARD_COUNTS,
           payload: response.data
       })
   });
}

export const getTransaction_history = () => (dispatch) =>{

    axios.get(`${ROOT_URL}transaction_history`).then(function(response){
       console.log('response',response);
       dispatch({
           type: TRANSACTION_HISTORY,
           payload: response.data.result
       })
   });
}

export const getStocksData = () => (dispatch) =>{

    axios.get(`${ROOT_URL}stocks`).then(function(response){
       console.log('response',response);
       dispatch({
           type: STOCK_DATA,
           payload: response.data.result
       })
   });
}

export const getAllStocks = () => (dispatch) =>{

    axios.get(`${ROOT_URL}all_stocks`).then(function(response){
       console.log('response',response);
       dispatch({
        type: ALL_STOCKS_DATA,
        payload: response.data.result
    })
       
   });
}

export const generate_access_token = (request_token) => (dispatch) =>{
    console.log(request_token);
    
    axios.post(`${ROOT_URL}generate_access_token/`+request_token,).then(function(response){
       console.log('response',response);
       dispatch({
           type: ACCESSTOKEN,
           payload: response.data
       })
   });
}


export const Add_stocks = (stocks) => (dispatch) =>{
    console.log(stocks);
    
    axios.post(`${ROOT_URL}add_stocks`,stocks).then(function(response){
       console.log('response',response);
       dispatch(getStocksData())
   });
}

export const Post_At_start = (amount) => (dispatch) =>{
    console.log(amount);
    
    axios.post(`${ROOT_URL}start_click `,amount).then(function(response){
       console.log('response',response);
       dispatch({
           type: START_AMOUNT,
           payload: response.data
       })
   });
}

export const remove_stock = (id) => (dispatch) =>{
    console.log(id);
    
    axios.post(`${ROOT_URL}remove_stock/`+id).then(function(response){
       console.log('response',response);
       dispatch(getStocksData())
   });
}