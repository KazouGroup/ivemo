import {
    GET_ACTIVITYCITIES_INTERESSE,
    GET_ACTIVITYCITIES_SHOW,
    LIKE_ACTIVITYCITIES_ADD,
    LIKE_ACTIVITYCITIES_REMOVE,
    FAVORITE_ACTIVITYCITIES_ADD,
    FAVORITE_ACTIVITYCITIES_REMOVE,
    LIKE_ACTIVITYCITIES_SHOW_ADD,
    LIKE_ACTIVITYCITIES_SHOW_REMOVE,
    FAVORITE_ACTIVITYCITIES_SHOW_ADD,
    FAVORITE_ACTIVITYCITIES_SHOW_REMOVE,
} from "../index";

import Swal from "sweetalert2";


export const loadActivitycitiesinteresses = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let url = route('api.activitycityinteresse_site', [itemCity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ACTIVITYCITIES_INTERESSE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadActivitycitiesshow = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let itemActivitycity = props.match.params.activitycity;
    let url = route('api.activitycity_show_site', [itemCity,itemActivitycity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ACTIVITYCITIES_SHOW,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('activitycities_likes.active', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_ACTIVITYCITIES_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const unlikeItem = props => dispatch => {

    const url = route('activitycities_likes.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_ACTIVITYCITIES_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const favoriteItem = props => dispatch => {

    const url = route('activitycities_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: FAVORITE_ACTIVITYCITIES_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('activitycities_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: FAVORITE_ACTIVITYCITIES_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error));
};

export const likeshowItem = props => dispatch => {

    const url = route('activitycities_likes.active', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_ACTIVITYCITIES_SHOW_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const unlikeshowItem = props => dispatch => {

    const url = route('activitycities_likes.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_ACTIVITYCITIES_SHOW_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const favoriteshowItem = props => dispatch => {

    const url = route('activitycities_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: FAVORITE_ACTIVITYCITIES_SHOW_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error));
};

export const unfavoriteshowItem = props => dispatch => {

    const url = route('activitycities_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: FAVORITE_ACTIVITYCITIES_SHOW_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error));
};
