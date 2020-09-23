import {
    GET_BLOGANNONCELOCATION_INTERESSE,
    FAVORITE_BLOGANNONCELOCATION_ADD,
    FAVORITE_BLOGANNONCELOCATION_REMOVE,
    DELETE_BLOGANNONCELOCATION,
    UNACTIVE_BLOGANNONCELOCATION,
    LIKE_BLOGANNONCELOCATION_ADD,
    LIKE_BLOGANNONCELOCATION_REMOVE,
} from "../index";

import Swal from "sweetalert2";



export const loadBlogannoncelocationsinteresses = (props) => dispatch => {

    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let url = route('api.blogannoncelocationinteresse_site', [itemCategoryannoncelocation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_BLOGANNONCELOCATION_INTERESSE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('blogannoncelocations_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_BLOGANNONCELOCATION_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('blogannoncelocations_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_BLOGANNONCELOCATION_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('likeblogannoncelocations_likedata.likedata', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_BLOGANNONCELOCATION_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error));
};

export const unlikeItem = props => dispatch => {

    const url = route('likeblogannoncelocations_unlikedata.unlikedata', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_BLOGANNONCELOCATION_REMOVE,
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

            const url = route('blogannoncecategorylocationunactive_site.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_BLOGANNONCELOCATION,
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

            const url = route('blogannoncecategorylocationdelete_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_BLOGANNONCELOCATION,
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

