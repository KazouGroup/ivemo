import {
    GET_CATEGORYANNONCELOCATIONS,
    GET_CITYANNONCELOCATIONS,
    GET_ANNONCELOCATION_INTERESSE_BY_CATEGORY,
    GET_ANNONCELOCATION_INTERESSE_BY_CITY,
    FAVORITE_ANNONCELOCATION_ADD,
    FAVORITE_ANNONCELOCATION_REMOVE,
} from "../types";

import Swal from "sweetalert2";

export const loadCategoryannonces = () => dispatch => {

    dyaxios.get(route('api.categoryannoncelocation_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCELOCATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCityannonces = () => dispatch => {

    dyaxios.get(route('api.citiesannoncelocations_site'))
        .then(response => dispatch({
                type: GET_CITYANNONCELOCATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadAnnoncelocationsinteressesbycategories = (props) => dispatch => {

    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let url = route('api.annoncelocationinteresse_by_categoryannoncelocation_site', [itemCategoryannoncelocation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCELOCATION_INTERESSE_BY_CATEGORY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadAnnoncelocationsinteressesbycity = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let itemCityannonce = props.match.params.city;
    let url = route('api.annoncelocationinteresse_by_city_site', [itemannoncetype, itemCategoryannoncelocation, itemCityannonce]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCELOCATION_INTERESSE_BY_CITY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('annoncelocations_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_ANNONCELOCATION_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('annoncelocations_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_ANNONCELOCATION_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

