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
import commentsReducer from "./commentsReducer";
import annoncelocationshowReducer from "./annoncelocation/annoncelocationshowReducer";
import blogannoncelocationReducer from "./blogannoncelocation/blogannoncelocationReducer";
import profileReducer from "./profileReducer";
import annonceventeshowReducer from "./annoncevente/annonceventeshowReducer";
import blogannonceventeReducer from "./blogannoncevente/blogannonceventeReducer";
import annoncereservationshowReducer from "./annoncereservation/annoncereservationshowReducer";
import annoncereservationReducer from "./annoncereservation/annoncereservationReducer";
import blogannoncereservationReducer from "./blogannoncereservation/blogannoncereservationReducer";
import contactservicesReducer from "./contactservice/contactservicesReducer";
import favoritesReducer from "./favoritesReducer";



export default combineReducers({
    workwithuses: workwithuseReducer,
    employments: employmentReducer,
    employmentshow: employmentshowReducer,
    forums: forumReducer,
    forumshow: forumshowReducer,
    favorites: favoritesReducer,
    annonceventes: annonceventeReducer,
    annoncelocations: annoncelocationReducer,
    annoncereservationshow: annoncereservationshowReducer,
    annoncereservations: annoncereservationReducer,
    annoncelocationshow: annoncelocationshowReducer,
    annonceventeshow: annonceventeshowReducer,
    blogannoncelocations: blogannoncelocationReducer,
    blogannoncereservations: blogannoncereservationReducer,
    blogannonceventes: blogannonceventeReducer,
    commentsites: commentsReducer,
    profile: profileReducer,
    contactusers: contactservicesReducer,
    contactservicemploymentcontactshow: contactservicemploymentcontactshowReducer,
    contactservicemploymentshow: contactservicemploymentshowReducer,
})
