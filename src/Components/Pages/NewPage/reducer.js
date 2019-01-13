import { DASHBOARD_COUNTS,STOCK_DATA,ALL_STOCKS_DATA,TRANSACTION_HISTORY} from './action';

export  function Dashboard_CountsReducer(state=[],action){
    switch(action.type){
        case DASHBOARD_COUNTS:
            return action.payload;
        default : 
            return state;
    }
}

export  function Transaction_historyReducer(state=[],action){
    switch(action.type){
        case TRANSACTION_HISTORY:
            return action.payload;
        default : 
            return state;
    }
}
export  function allStocksListReducer(state=[],action){
    switch(action.type){
        case ALL_STOCKS_DATA:
            return action.payload;
        default : 
            return state;
    }
}
export  function GetStocksDataReducer(state=[],action){
    switch(action.type){
        case STOCK_DATA:
            return action.payload;
        default : 
            return state;
    }
}