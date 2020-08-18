import {
    SUBSCRIBE_USER_FOR_EMPLOYEMENT_ADD,
    SUBSCRIBE_USER_FOR_EMPLOYEMENT_REMOVE,
    FAVORITE_EMPLOYEMENT_ADD,
    FAVORITE_EMPLOYEMENT_REMOVE,
    GET_CATEGORYEMPLOYMENTS,
    GET_CITYEMPLOYMENTS,
    GET_CATEGORYEMPLOYMENTS_BY_CATEGORY,
    GET_CATEGORYEMPLOYMENTS_BY_USER,
    GET_EMPLOYEMENT_BY_USER_PUBLIC,
    GET_EMPLOYEMENT_BY_USER_PRIVATE,
    GET_EMPLOYEMENT_INTERESSE,
    GET_ALL_EMPLOYEMENTS,
    GET_EMPLOYEMENT_BY_CATEGORY,
    GET_EMPLOYEMENT_CATEGORY_COUNT,
    GET_EMPLOYEMENT_BY_CATEGORY_COUNT,
    GET_ALL_EMPLOYMENTS_FOR_CONTACTSERVICE,
    UNACTIVE_PRIVATE_EMPLOYEMENT,
    UNACTIVE_EMPLOYEMENT,
    ACTIVE_EMPLOYEMENT,
    DELETE_EMPLOYEMENT,
    GET_PROFILE_USER_FOR_PUBLIC,
    GET_PROFILE_USER_FOR_PRIVATE,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
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

export const loadCityemployments = () => dispatch => {

    dyaxios.get(route('api.cityemployment_site'))
        .then(response => dispatch({
                type: GET_CITYEMPLOYMENTS,
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

export const loademployments = () => dispatch => {

    let url = route('api.employments_site');
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ALL_EMPLOYEMENTS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentsbycategory = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let url = route('api.employmentscategory_site',[itemCategoryemployment]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_BY_CATEGORY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentscategorycount = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let url = route('api.employmentscategorycount_site',[itemCategoryemployment]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_CATEGORY_COUNT,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentbycategorybycount = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let url = route('api.employmentbycategorybycount_site',[itemCategoryemployment]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_BY_CATEGORY_COUNT,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentinteresse = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.employmentsinteresse_site', [itemuser]);
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

export const loadProfileusersforprivate = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.profilprivate',[itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_PROFILE_USER_FOR_PRIVATE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loademploymentbyuserprivate = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.employmentsbyuser_site', [itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_BY_USER_PRIVATE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

/*
Ici je fais des abonnement a le section dans de cas c'est employment
*/
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
/*
End
*/

/*
Avec le code ci dessous je recupere m'abonne à l'utilisateur
*/
export const followerItem = (props) => dispatch => {


    let url = route('users_followeuser.follow',[props.id]);
    dyaxios.post(url)
        .then(() => dispatch({
                type: FOLLOWERUSER_ADD,
                payload: props.id
            })
        ).catch(error => console.error(error));
};

export const unfollowerItem = (props) => dispatch => {

    Swal.fire({
        text:  "Se désabonner de "+props.first_name+" ?",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Oui, se désabonner',
        cancelButtonText: 'Non, annuller',
        showCancelButton: true,
        reverseButtons: true,
    }).then((result) => {
        if (result.value) {

            let url = route('users_followeuser.follow',[props.id]);
            dyaxios.post(url)
                .then(() => dispatch({
                        type: FOLLOWERUSER_REMOVE,
                        payload: props.id
                    })
                ).catch(error => console.error(error));
        }
    })
};
/*
End
*/


export const loadContactserviceemployments = props => dispatch => {

    let itemUser = props.match.params.user;
    let url = route('api.contactservice_employments_site',[itemUser]);
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_ALL_EMPLOYMENTS_FOR_CONTACTSERVICE,
            payload: response.data
        })
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

export const activeItem = props => dispatch => {

    Swal.fire({
        title: 'Afficher cette annonce?',
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

            const url = route('employmentsactivated_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: ACTIVE_EMPLOYEMENT,
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

export const unactiveprivateItem = props => dispatch => {

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
                    type: UNACTIVE_PRIVATE_EMPLOYEMENT,
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
