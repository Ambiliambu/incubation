import axios from "axios";
import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "../constants/adminContants";  

export const adminlogin=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_LOGIN_REQUEST});
        const config={
          header:{
            "Content-type":"application/json"
          }
        }
  
          const formdata= {email:email,password:password}
        const {data}=await axios.post('/api/admin/adminlogin',formdata,
        config
        );
        dispatch({type:ADMIN_LOGIN_SUCCESS,payload:data})
        localStorage.setItem('adminInfo',JSON.stringify(data))
        
    }catch(error){
        dispatch({
            type:ADMIN_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
        })
    }
}

//adminlogout

export const adminlogout=()=>async(dispatch)=>{
    localStorage.removeItem('adminInfo')
    dispatch({type:ADMIN_LOGOUT})
}