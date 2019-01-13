import { combineReducers } from 'redux';
import  LoginReducer from '../Pages/LoginPage/reducer';
import {Dashboard_CountsReducer,Transaction_historyReducer,GetStocksDataReducer,allStocksListReducer} from '../Pages/NewPage/reducer';

const rootReducer = combineReducers({
    loginResponse: LoginReducer,
    Dashboard_CountsReducer,
    Transaction_historyReducer,
    GetStocksDataReducer,
    allStocksListReducer
    
});

export default rootReducer;
