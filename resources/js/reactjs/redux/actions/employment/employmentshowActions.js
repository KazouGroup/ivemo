import {
    GET_EMPLOYEMENT_SHOW_USER_SITE,
    STATUS_COMMENT_EMPLOYMENT_ADD,
    STATUS_COMMENT_EMPLOYMENT_REMOVE,
    LIKE_EMPLOYEMENT_ADD,
    LIKE_EMPLOYEMENT_REMOVE,
    FAVORITE_EMPLOYEMENT_SHOW_ADD,
    FAVORITE_EMPLOYEMENT_SHOW_REMOVE,
    GET_PROFILE_USER_FOR_PUBLIC,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
    SUBSCRIBE_USER_FOR_EMPLOYEMENT_ADD, SUBSCRIBE_USER_FOR_EMPLOYEMENT_REMOVE,
} from "../types";
import Swal from "sweetalert2";


/**
 * Ce code c'est pour les abbnent de l'utilisateur
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

/**
 * tout ce code ci bas c'est uniquement pour employment
 * @param props
 * @returns {function(...[*]=)}
 */
export const loademploymentshowusersite = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let itemCity = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemEmployment = props.match.params.employment;
    let url = route('api.employmentsbycategorybycityslug_site', [itemCategoryemployment, itemCity,itemuser, itemEmployment]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_EMPLOYEMENT_SHOW_USER_SITE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

//Ici c'est pour changer le status des commentaire sur l'annonce
export const statuscommentaddItem = props => dispatch => {

    const url = route('employments_active_comments_site', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: STATUS_COMMENT_EMPLOYMENT_ADD,
                payload: props.id
            });

            $.notify({

                    message: "Les commentaires sont activés sur cette annonce.",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'top',
                        align: 'right'
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
        text: "Désactiver les commentaires de cette annonce?",
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
            let url = route('employments_desactive_comments_site', [props.id]);
            dyaxios.get(url).then(() => {

                dispatch({
                    type: STATUS_COMMENT_EMPLOYMENT_REMOVE,
                    payload: props.id
                });

                $.notify({

                        message: "Les commentaires sont désactivés sur cette annonce.",
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
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

    const url = route('employments_likes.active', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_EMPLOYEMENT_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const unlikeItem = props => dispatch => {

    const url = route('employments_likes.unactive', [props.id]);
    dyaxios.post(url).then(() => {

        dispatch({
            type: LIKE_EMPLOYEMENT_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};


export const favoriteItem = props => dispatch => {

    const url = route('employments_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_EMPLOYEMENT_SHOW_ADD,
                payload: props.id
            });

            $.notify({
                    message: "L\'annonce a été ajoutée à vos favoris.",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'top',
                        align: 'right'
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
                type: FAVORITE_EMPLOYEMENT_SHOW_REMOVE,
                payload: props.id
            });

            $.notify({
                    message: "L\'annonce a été retirée de vos favoris.",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'top',
                        align: 'right'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
        }
    ).catch(error => console.error(error));
};
