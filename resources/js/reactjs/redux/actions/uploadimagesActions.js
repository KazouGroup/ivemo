import {
    GET_UPLOADIMAGES_ANNONCELOCATION_SHOW_USER_SITE,
    GET_UPLOADIMAGES_ACTIVITYCITIES,
    GET_UPLOADIMAGES_ANNONCEVENTE_SHOW_USER_SITE,
} from "./index";

import Swal from "sweetalert2";



export const loadUploadimageActivitycities = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let itemActivitycity = props.match.params.activitycity;
    let url = route('api.citygetuploadimage_site', [itemCity,itemActivitycity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_UPLOADIMAGES_ACTIVITYCITIES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadUploadimageAnnoncelocations = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let itemCity = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemannoncelocation = props.match.params.annoncelocation;
    let url = route('api.annoncelocationgetuploadimage_site',[itemannoncetype,itemCategoryannoncelocation,itemCity,itemuser,itemannoncelocation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_UPLOADIMAGES_ANNONCELOCATION_SHOW_USER_SITE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadUploadimageAnnonceventes = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncevente = props.match.params.categoryannoncevente;
    let itemcityannonce = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemannoncevente = props.match.params.annoncevente;
    let url = route('api.annonceventegetuploadimage_site',[itemannoncetype,itemCategoryannoncevente,itemcityannonce,itemuser,itemannoncevente]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_UPLOADIMAGES_ANNONCEVENTE_SHOW_USER_SITE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};
