import {
    GET_CITY_SHOW,
    LIKE_CITY_ADD,
    LIKE_CITY_REMOVE,
} from "./types";

import Swal from "sweetalert2";


export const loadCityItemshow = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let url = route('api.city_site', [itemCity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_CITY_SHOW,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('cities_likes.active', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_CITY_ADD,
            payload: props.id
        });

        $.notify({
                //,
                message: `La ville de ${props.name} a été ajouté à vos listes`
            },
            {
                allow_dismiss: false,
                type: 'info',
                placement: {
                    from: 'bottom',
                    align: 'center'
                },
                animate: {
                    enter: "animate__animated animate__fadeInUp",
                    exit: "animate__animated animate__fadeOutDown"
                },
            });

    }).catch(error => console.error(error))
};

export const unlikeItem = props => dispatch => {

    const url = route('cities_likes.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_CITY_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};
