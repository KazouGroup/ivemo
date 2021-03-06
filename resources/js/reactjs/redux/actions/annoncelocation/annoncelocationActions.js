import {
    GET_CATEGORYANNONCELOCATIONS,
    GET_CITYANNONCELOCATIONS,
    GET_CATEGORYANNONCELOCATIONS_BY_USER,
    GET_ANNONCELOCATION_INTERESSE_BY_CATEGORY,
    GET_ANNONCELOCATION_INTERESSE_BY_USER,
    FAVORITE_ANNONCELOCATION_ADD,
    FAVORITE_ANNONCELOCATION_REMOVE,
    UNACTIVE_ANNONCELOCATION,
    DELETE_ANNONCELOCATION,
    GET_PROFILE_USER_FOR_PUBLIC,
    GET_ANNONCELOCATION_BY_USER_PUBLIC,
    GET_ANNONCELOCATION_BY_USER_PRIVATE,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
    SUBSCRIBE_USER_FOR_ANNONCELOCATION_ADD,
    SUBSCRIBE_USER_FOR_ANNONCELOCATION_REMOVE,
    GET_PROFILE_USER_FOR_PRIVATE,
    ACTIVE_CO_ANNONCELOCATION,
    UNACTIVE_CO_ANNONCELOCATION,
} from "../index";

import Swal from "sweetalert2";

export const loadCategoryannonces = () => dispatch => {

    dyaxios.get(route('api.categoryannoncelocation_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCELOCATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryannoncesbyuser = () => dispatch => {

    dyaxios.get(route('api.categoryannoncelocations_by_user_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCELOCATIONS_BY_USER,
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

export const loadAnnoncelocationsinteressesbyuser = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemuser = props.match.params.user;
    let url = route('api.annoncelocationinteresse_by_user_site', [itemannoncetype, itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCELOCATION_INTERESSE_BY_USER,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

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

export const loadProfileusersforprivate = (props) => dispatch => {

    let url = route('api.profilprivate');
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_PROFILE_USER_FOR_PRIVATE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};


export const loadannoncebyuserprivate = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let url = route('api.profilprivate_annoncelocations',[itemannoncetype]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCELOCATION_BY_USER_PRIVATE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadannoncebyuserpublic = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let itemannoncetype = props.match.params.annoncetype;
    let url = route('api.profilpublique_annoncelocations',[itemuser,itemannoncetype]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCELOCATION_BY_USER_PUBLIC,
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

export const unactiveItem = props => dispatch => {

    Swal.fire({
        title: 'Masquer cette annonce?',
        text: "??tes-vous s??r de vouloir executer cette action",
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

            const url = route('annonces_locations_status.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_ANNONCELOCATION,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: 'Annonce masqu??e aux utilisateurs'
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

export const activeaslItem = props => dispatch => {

    const url = route('annonces_locations_status.site', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: ACTIVE_CO_ANNONCELOCATION,
                payload: props.id
            });

            $.notify({
                    message: "Cette annonce est visible aux utilisateurs",
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

export const unactiveprivatealsItem = props => dispatch => {

    const url = route('annonces_locations_status.site', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: UNACTIVE_CO_ANNONCELOCATION,
                payload: props.id
            });

            $.notify({
                    message: "Cette annonce a ??t?? masqu??e aux utilisateurs",
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

export const deleteItem = props => dispatch => {

    Swal.fire({
        title: 'Supprimer cette annonce?',
        text: "??tes-vous s??r de vouloir executer cette action",
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

            const url = route('annonces_locations_delete.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: DELETE_ANNONCELOCATION,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: 'Annonce supprim??e avec succ??s'
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

/*
Ici je fais des abonnement a le section dans de cas c'est employment
*/
export const   subscribeItem = props => dispatch => {

    const url = route('annonces_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_ANNONCELOCATION_ADD,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const  unsubscribeItem = props => dispatch => {

    const url = route('annonces_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_ANNONCELOCATION_REMOVE,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};
/*
End
*/

/*
Avec le code ci dessous je recupere m'abonne ?? l'utilisateur
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
        text:  "Se d??sabonner de "+props.first_name+" ?",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Oui, se d??sabonner',
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
