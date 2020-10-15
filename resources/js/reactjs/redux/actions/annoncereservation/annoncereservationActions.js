import {
    GET_CATEGORYANNONCERESERVATIONS,
    GET_CITYANNONCERESERVATIONS,
    GET_ANNONCERESERVATION_INTERESSE_BY_USER,
    GET_ANNONCERESERVATION_INTERESSE_BY_CITY,
    FAVORITE_ANNONCERESERVATION_ADD,
    FAVORITE_ANNONCERESERVATION_REMOVE,
    UNACTIVE_ANNONCERESERVATION,
    GET_CATEGORYANNONCERESERVATIONS_BY_USER,
} from "../index";

import Swal from "sweetalert2";

export const loadCategoryannonces = () => dispatch => {

    dyaxios.get(route('api.categoryannoncereservations_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCERESERVATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCityannonces = () => dispatch => {

    dyaxios.get(route('api.citiesannoncereservations_site'))
        .then(response => dispatch({
                type: GET_CITYANNONCERESERVATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryannoncesbyuser = (props) => dispatch => {

    dyaxios.get(route('api.categoryannoncereservations_by_user'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCERESERVATIONS_BY_USER,
                payload: response.data
            })
        ).catch(error => console.error(error));
};


export const loadAnnoncereservationsinteressesbyuser = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemuser = props.match.params.user;
    let url = route('api.annoncereservationintersse_site', [itemannoncetype,itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCERESERVATION_INTERESSE_BY_USER,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadAnnoncereservationsinteressesbycity = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let itemCityannonce = props.match.params.city;
    let url = route('api.annoncelocationinteresse_by_city_site', [itemannoncetype, itemCategoryannoncelocation, itemCityannonce]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCERESERVATION_INTERESSE_BY_CITY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('annoncereservations_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_ANNONCERESERVATION_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('annoncereservations_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_ANNONCERESERVATION_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unactiveItem = props => dispatch => {

    Swal.fire({
        title: 'Masquer cette article?',
        text: "êtes-vous sûr de vouloir executer cette action",
        type: 'warning',
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Non, annuller',
        showCancelButton: true,
        reverseButtons: true,
    }).then((result) => {
        if (result.value) {

            const url = route('annonces_reservations_status.site',[props.slugin]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_ANNONCERESERVATION,
                    payload: props.slugin
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: 'Annonce masquée aux utilisateurs'
                    },
                    {
                        allow_dismiss: false,
                        type: 'primary',
                        placement: {
                            from: 'bottom',
                            align: 'right'
                        },
                        animate: {
                            enter: 'animate__animated animate__fadeInRight',
                            exit: 'animate__animated animate__fadeOutRight'
                        },
                    });
                /** End alert ***/

            }).catch(() => {
                //Failled message
                $.notify("Ooop! Une erreur est survenue", {
                    allow_dismiss: false,
                    type: 'danger',
                    animate: {
                        enter: 'animate__animated animate__bounceInDown',
                        exit: 'animate__animated animate__bounceOutUp'
                    }
                });
            })
        }
    });

};

