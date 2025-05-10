import axios from "axios";
import { BASE_API } from "../constants/app"
import store from "../redux/store";
const Http = axios.create({
  withCredentials: true,
  baseURL: BASE_API,
});



Http.interceptors.request.use(async function (config) {
  console.log(config);
  const Auth = store.getState().auth; 
  const token = Auth.login.currentCustomer?.accessToken;
  console.log('token', token);
  // if(token){
  //     const decoded = jwtDecode(token);
  //     if(decoded.exp < new Date()/1000){
  //         // store.dispatch(loggedOut());
  //         if(config.url.indexOf("/customer/refreshToken") >= 0) return config;
  //         const data = (await refreshToken()).data;
  //         const newAccessToken = data.accessToken;
  //         const newRefreshToken = data.refreshToken;
  //         console.log(`newAccessToken:${newAccessToken}`);
  //         console.log(`newRefreshToken:${newRefreshToken}`);
  //         store.dispatch(updateCustomerToken({newAccessToken, newRefreshToken}));
  //         config.headers["token"] = `Bearer ${newAccessToken}`;
  //         return config;

  //     }
  // }
  config.headers["token"] = `Bearer ${token}`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
}); 


export default Http;