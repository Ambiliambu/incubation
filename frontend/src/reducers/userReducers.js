import { USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from "../constants/userConstants";
//login
export const userLoginReducer=(state= {}, action)=>{
    switch (action.type) {
         case USER_LOGIN_REQUEST:
           return {};
        case USER_LOGIN_SUCCESS:
            return {userInfo :action.payload};
        case USER_LOGIN_FAIL:
            return {error:action.payload};
        case USER_LOGOUT:
            return {};
    
        default:
            return state;
    }
}

//signup
export const userSignupReducer=(state= {}, action)=>{
    switch (action.type) {
         case  USER_SIGNUP_REQUEST:
           return {};
        case USER_SIGNUP_SUCCESS:
            return {userInfo :action.payload};
        case USER_SIGNUP_FAIL:
            return {error:action.payload};
     
    
        default:
            return state;
    }
}

