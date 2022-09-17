import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "../constants/adminContants";


export const adminLoginReducer=(state= {}, action)=>{
    switch (action.type) {
         case ADMIN_LOGIN_REQUEST:
           return {};
        case ADMIN_LOGIN_SUCCESS:
            return {adminInfo :action.payload};
        case ADMIN_LOGIN_FAIL:
            return {error:action.payload};
        case ADMIN_LOGOUT:
            return {};
    
        default:
            return state;
    }
}