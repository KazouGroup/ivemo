import {combineReducers} from "redux";
import workwithuseReducer from "./workwithuseReducer";


export default combineReducers({
    workwithuses: workwithuseReducer,
})
