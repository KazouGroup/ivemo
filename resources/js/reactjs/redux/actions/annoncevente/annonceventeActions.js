import {
    GET_CATEGORYANNONCEVENTES,
    GET_CITYANNONCEVENTES,
    GET_CATEGORYANNONCEVENTES_BY_CITY,
    FAVORITE_ANNONCEVENTE_ADD,
    FAVORITE_ANNONCEVENTE_REMOVE,
    GET_ALL_ANNONCEVENTES,
    GET_ANNONCEVENTE_INTERESSE_BY_CITY,
    UNACTIVE_ANNONCEVENTE,
    GET_PROFILE_USER_FOR_PUBLIC,
    GET_ANNONCEVENTE_BY_USER_PUBLIC,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
    DELETE_ANNONCEVENTE,
    SUBSCRIBE_USER_FOR_ANNONCEVENTE_ADD,
    SUBSCRIBE_USER_FOR_ANNONCEVENTE_REMOVE,
    GET_ANNONCEVENTE_BY_USER_PRIVATE,
    GET_PROFILE_USER_FOR_PRIVATE,
    ACTIVE_CO_ANNONCEVENTE,
    UNACTIVE_CO_ANNONCEVENTE,
} from "../index";

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

export const loadAnnonces = (props) => dispatch => {

    let itemAnnoncevente = props.match.params.annoncetype;
    dyaxios.get(route('api.citiesannonceventes_site'))
        .then(response => dispatch({
                type: GET_ALL_ANNONCEVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadAnnonceventesinteressesbycity = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    //let itemuser = props.match.params.user;
    let itemcity = props.match.params.city;
    let url = route('api.annonceventeinteresse_site', [itemannoncetype, itemcity]);

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

export const loadannoncebyuserpublic = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let itemannoncetype = props.match.params.annoncetype;
    let url = route('api.profilpublique_annonceventes',[itemuser,itemannoncetype]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCEVENTE_BY_USER_PUBLIC,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadannoncebyuserprivate = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let itemannoncetype = props.match.params.annoncetype;
    let url = route('api.profilprivate_annonceventes',[itemuser,itemannoncetype]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCEVENTE_BY_USER_PRIVATE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadProfileusersforprivate = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.profilprivate', [itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_PROFILE_USER_FOR_PRIVATE,
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

export const activeaslItem = props => dispatch => {

    const url = route('annonces_ventes_status.site', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: ACTIVE_CO_ANNONCEVENTE,
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

    const url = route('annonces_ventes_status.site', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: UNACTIVE_CO_ANNONCEVENTE,
                payload: props.id
            });

            $.notify({
                    message: "Cette annonce a été masquée aux utilisateurs",
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

            const url = route('annonces_ventes_delete.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: DELETE_ANNONCEVENTE,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: 'Annonce supprimée avec succès'
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
export const   subscribeItem = props => dispatch => {

    const url = route('annonces_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_ANNONCEVENTE_ADD,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const  unsubscribeItem = props => dispatch => {

    const url = route('annonces_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_ANNONCEVENTE_REMOVE,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};


