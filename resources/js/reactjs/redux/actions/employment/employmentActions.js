import {
    SUBSCRIBE_USER_FOR_EMPLOYEMENT_ADD,
    SUBSCRIBE_USER_FOR_EMPLOYEMENT_REMOVE,
    FAVORITE_EMPLOYEMENT_ADD,
    FAVORITE_EMPLOYEMENT_REMOVE,
    GET_CATEGORYEMPLOYMENTS,
    GET_CATEGORYEMPLOYMENTS_BY_CATEGORY,
    GET_CATEGORYEMPLOYMENTS_BY_USER,
    GET_EMPLOYEMENT_BY_USER_PUBLIC,
    GET_EMPLOYEMENT_INTERESSE,
    UNACTIVE_EMPLOYEMENT,
    DELETE_EMPLOYEMENT,
    GET_PROFILE_USER_FOR_PUBLIC,
} from "../types";

import Swal from "sweetalert2";

export const loadProfileusersforpublic = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.profilpublique',[itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_PROFILE_USER_FOR_PUBLIC,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryemployments = () => dispatch => {

    dyaxios.get(route('api.categoryemployment_site'))
        .then(response => dispatch({
                type: GET_CATEGORYEMPLOYMENTS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryemploymentsbycategory = props => dispatch => {

    let itemCity = props.match.params.city;
    dyaxios.get(route('api.categoryemploymentcitycount_site', [itemCity]))
        .then(response => dispatch({
                type: GET_CATEGORYEMPLOYMENTS_BY_CATEGORY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryemploymentsbyuser = () => dispatch => {

    dyaxios.get(route('api.categoryemployments_by_user_site'))
        .then(response => dispatch({
                type: GET_CATEGORYEMPLOYMENTS_BY_USER,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentinteresse = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let url = route('api.employmentsinteresse_site', [itemCategoryemployment]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_INTERESSE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentbyuserpublic = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.profilpublique_employments', [itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_BY_USER_PUBLIC,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const   subscribeItem = props => dispatch => {

    const url = route('employments_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_EMPLOYEMENT_ADD,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const  unsubscribeItem = props => dispatch => {

    const url = route('employments_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_EMPLOYEMENT_REMOVE,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('employments_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_EMPLOYEMENT_ADD,
                payload: props.id
            });

            $.notify({
                    message: "Annonce ajoutée à vos favoris",
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
        }
    ).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('employments_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_EMPLOYEMENT_REMOVE,
                payload: props.id
            });

            $.notify({
                    message: "Annonce ajoutée à vos favoris",
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
        }
    ).catch(error => console.error(error));
};

export const unactiveItem = props => dispatch => {

    Swal.fire({
        title: 'Masquer cette annonce?',
        text: "êtes vous sure de vouloir confirmer cette action?",
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

            const url = route('employmentsunactivated_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_EMPLOYEMENT,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: "Annonce masquée aux utilisateurs",
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

            const url = route('employmentsdelete_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_EMPLOYEMENT,
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
