import {
    GET_ANNONCERESERVATION_SHOW_USER_SITE,
    STATUS_COMMENT_ANNONCERESERVATION_ADD,
    STATUS_COMMENT_ANNONCERESERVATION_REMOVE,
    LIKE_ANNONCERESERVATION_ADD,
    LIKE_ANNONCERESERVATION_REMOVE,
    FAVORITE_ANNONCERESERVATION_SHOW_ADD,
    FAVORITE_ANNONCERESERVATION_SHOW_REMOVE,
    GET_PROFILE_USER_FOR_PUBLIC,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
    SUBSCRIBE_USER_FOR_ANNONCERESERVATION_ADD,
    SUBSCRIBE_USER_FOR_ANNONCERESERVATION_REMOVE,
} from "../types";

import Swal from "sweetalert2";



/**
 * Ce code c'est pour les abbonement de l'utilisateur
 * @param props
 * @returns {function(...[*]=)}
 */
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

export const   subscribeItem = props => dispatch => {

    const url = route('annonces_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_ANNONCERESERVATION_ADD,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const  unsubscribeItem = props => dispatch => {

    const url = route('annonces_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_ANNONCERESERVATION_REMOVE,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

/**
 *
 * @param props
 * @returns {function(...[*]=)}
 */
export const loadannoncereservationshowusersite = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncereservation = props.match.params.categoryannoncereservation;
    let itemcityannonce = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemannoncereservation = props.match.params.annoncereservation;

    let url = route('api.annoncelocationbycategoryannoncereservationslug_site',[itemannoncetype,itemCategoryannoncereservation,itemcityannonce,itemuser,itemannoncereservation]);

    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_ANNONCERESERVATION_SHOW_USER_SITE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

//Ici c'est pour changer le status des commentaire sur l'annonce
export const statuscommentaddItem = props => dispatch => {

    const url = route('annonces_reservations_status_comments.site', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: STATUS_COMMENT_ANNONCERESERVATION_ADD,
                payload: props.id
            });

            $.notify({

                    message: "Commentaires activés sur cette annonce",
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

export const statuscommentremoveItem = props => dispatch => {

    Swal.fire({
        text: "Desactiver les commentaires de cette annonce?",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Non, annuller',
        showCancelButton: true,
        reverseButtons: true,
    }).then((result) => {
        if (result.value) {

            //Envoyer la requet au server
            let url = route('annonces_reservations_status_comments.site', [props.id]);
            dyaxios.get(url).then(() => {

                dispatch({
                    type: STATUS_COMMENT_ANNONCERESERVATION_REMOVE,
                    payload: props.id
                });

                $.notify({

                        message: "Commentaires desactivé sur cette annonce",
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
        }
    })
};

export const likeItem = props => dispatch => {

    const url = route('annoncereservations_likes.active', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_ANNONCERESERVATION_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const unlikeItem = props => dispatch => {

    const url = route('annoncereservations_likes.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_ANNONCERESERVATION_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const favoriteItem = props => dispatch => {

    const url = route('annoncereservations_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_ANNONCERESERVATION_SHOW_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('annoncereservations_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_ANNONCERESERVATION_SHOW_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};
