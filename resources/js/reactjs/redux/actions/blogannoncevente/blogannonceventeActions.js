import {
    GET_BLOGANNONCEVENTE_INTERESSE,
    FAVORITE_BLOGANNONCEVENTE_ADD,
    FAVORITE_BLOGANNONCEVENTE_REMOVE,
    DELETE_BLOGANNONCEVENTE,
    UNACTIVE_BLOGANNONCEVENTE,
    LIKE_BLOGANNONCEVENTE_ADD,
    LIKE_BLOGANNONCEVENTE_REMOVE,
} from "../index";

import Swal from "sweetalert2";



export const loadBlogannonceinteresses = (props) => dispatch => {

    let itemCategoryannoncevente = props.match.params.categoryannoncevente;
    let url = route('api.blogannonceventeinteresse_site', [itemCategoryannoncevente]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_BLOGANNONCEVENTE_INTERESSE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('blogannonceventes_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_BLOGANNONCEVENTE_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('blogannonceventes_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_BLOGANNONCEVENTE_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('likeblogannonceventes_likedata.likedata', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_BLOGANNONCEVENTE_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error));
};

export const unlikeItem = props => dispatch => {

    const url = route('likeblogannonceventes_unlikedata.unlikedata', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_BLOGANNONCEVENTE_REMOVE,
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

            const url = route('blogannoncecategoryventeunactivated_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_BLOGANNONCEVENTE,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: 'Article masquée aux utilisateurs'
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

export const deleteItem = props => dispatch => {

    Swal.fire({
        title: 'Confirmer la supression?',
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

            const url = route('blogannoncecategoryventedelete_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_BLOGANNONCEVENTE,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        // title: 'Update',
                        message: 'Annonce suprimée avec success'
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

