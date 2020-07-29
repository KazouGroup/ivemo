import {combineReducers} from "redux";
import workwithuseReducer from "./workwithuseReducer";
import employmentReducer from "./employment/employmentReducer";
import contactservicemploymentcontactshowReducer from "./contactservice/employment/contactservicemploymentcontactshowReducer";
import contactservicemploymentshowReducer from "./contactservice/employment/contactservicemploymentshowReducer";
import employmentshowReducer from "./employment/employmentshowReducer";
import forumshowReducer from "./forum/forumshowReducer";
import forumReducer from "./forum/forumReducer";
import annonceventeReducer from "./annoncevente/annonceventeReducer";
import annoncelocationReducer from "./annoncelocation/annoncelocationReducer";


export default combineReducers({
    workwithuses: workwithuseReducer,
    employments: employmentReducer,
    employmentshow: employmentshowReducer,
    forums: forumReducer,
    forumshow: forumshowReducer,
    annonceventes: annonceventeReducer,
    annoncelocations: annoncelocationReducer,
    contactservicemploymentcontactshow: contactservicemploymentcontactshowReducer,
    contactservicemploymentshow: contactservicemploymentshowReducer,
})
