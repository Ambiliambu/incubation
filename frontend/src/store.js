import { applyMiddleware} from 'redux'
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import {combineReducers} from "redux"
import { userLoginReducer, userSignupReducer } from './reducers/userReducers';
import { adminLoginReducer } from './reducers/adminReducers';


const reducer= combineReducers({
    // this will conntain our reducers
   
    userLogin:userLoginReducer,
    userSignup:userSignupReducer,
    adminLogin:adminLoginReducer,

 
})

const userInfoFromStorage=localStorage.getItem('userInfo')
 ? JSON.parse(localStorage.getItem('userInfo'))
 :null

 const adminInfoFromStorage=localStorage.getItem('adminInfo')
 ? JSON.parse(localStorage.getItem('adminInfo'))
 :null



const initialState={
   userLogin:{userInfo: userInfoFromStorage},
   adminLogin:{adminInfo: adminInfoFromStorage}

};

const middleware= [thunk];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)

);

export default store;