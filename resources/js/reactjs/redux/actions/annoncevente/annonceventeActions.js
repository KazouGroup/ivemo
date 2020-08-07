import {
    GET_CATEGORYANNONCEVENTES,
    GET_CITYANNONCEVENTES,
    GET_CATEGORYANNONCEVENTES_BY_CITY,
    FAVORITE_ANNONCEVENTE_ADD, FAVORITE_ANNONCEVENTE_REMOVE,
    GET_ANNONCEVENTE_INTERESSE_BY_CITY,
    UNACTIVE_ANNONCEVENTE,
} from "../types";

import Swal from "sweetalert2";

export const loadCategoryannonces = () => dispatch => {

    dyaxios.get(route('api.categoryannoncevente_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCEVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCityannonces = () => dispatch => {

    dyaxios.get(route('api.citiesannonceventes_site'))
        .then(response => dispatch({
                type: GET_CITYANNONCEVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadAnnonceventesinteressesbycity = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncevente = props.match.params.categoryannoncevente;
    let itemCityannonce = props.match.params.city;
    let url = route('api.annonceventeinteresse_site', [itemannoncetype, itemCategoryannoncevente, itemCityannonce]);

    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCEVENTE_INTERESSE_BY_CITY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryannoncesbycity = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let url = route('api.categoryannonceventebycity_site',[itemCity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_CATEGORYANNONCEVENTES_BY_CITY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('annonceventes_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: FAVORITE_ANNONCEVENTE_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('annonceventes_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: FAVORITE_ANNONCEVENTE_REMOVE,
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

            const url = route('annonces_ventes_status.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_ANNONCEVENTE,
                    payload: props.id
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


