import {combineReducers} from "redux";
import workwithuseReducer from "./workwithuseReducer";
import employmentReducer from "./employment/employmentReducer";
import contactservicemploymentcontactshowReducer from "./contactservice/employment/contactservicemploymentcontactshowReducer";
import contactservicemploymentshowReducer from "./contactservice/employment/contactservicemploymentshowReducer";
import employmentshowReducer from "./employment/employmentshowReducer";
import forumshowReducer from "./forum/forumshowReducer";


export default combineReducers({
    workwithuses: workwithuseReducer,
    employments: employmentReducer,
    employmentshow: employmentshowReducer,
    forumshow: forumshowReducer,
    contactservicemploymentcontactshow: contactservicemploymentcontactshowReducer,
    contactservicemploymentshow: contactservicemploymentshowReducer,
})