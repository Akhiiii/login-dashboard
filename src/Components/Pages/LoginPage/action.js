/* login page actions */
import axios from 'axios';
import * as api_url from '../../Apis/api';

export const USER_LOGIN = 'login';

const ROOT_URL = api_url.API_URL;

export function userLogin(values) {
	 return(dispatch) => {
		   return axios.post(`${ROOT_URL}login`, values).then((response) =>{
			   console.log(response);
				  dispatch(loginUser(response.data));
			 })
	 }
}

export function loginUser(response){
		  return { type: USER_LOGIN, payload: response }
}