import {
    GET_FORUM_SHOW_USER_SITE,
    FAVORITE_FORUM_SHOW_ADD,
    FAVORITE_FORUM_SHOW_REMOVE,
    LIKE_FORUM_SHOW_ADD,
    LIKE_FORUM_SHOW_REMOVE,
    GET_PROFILE_USER_FOR_PUBLIC,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
    SUBSCRIBE_USER_FOR_FORUM_ADD,
    SUBSCRIBE_USER_FOR_FORUM_REMOVE,
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
        title:  "Se désabonner de "+props.first_name+" ?",
        text:  "En vous desabonnant vous ne pourriez plus recevoir les notifications des postes poster par "+props.first_name,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Oui, confirmer',
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

    const url = route('forums_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_FORUM_ADD,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const  unsubscribeItem = props => dispatch => {

    const url = route('forums_subscribe.subscribe', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: SUBSCRIBE_USER_FOR_FORUM_REMOVE,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};



export const loadforumshow = (props) => dispatch => {

    let itemCategoryforum = props.match.params.categoryforum;
    let itemuser = props.match.params.user;
    let itemForum = props.match.params.forum;
    let url = route('api.forumscategoryslugin_site', [itemCategoryforum,itemuser, itemForum]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_FORUM_SHOW_USER_SITE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('forums_likes.active', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_FORUM_SHOW_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const unlikeItem = props => dispatch => {

    const url = route('forums_likes.unactive', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_FORUM_SHOW_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const favoriteItem = props => dispatch => {

    const url = route('forums_favorites.active', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: FAVORITE_FORUM_SHOW_ADD,
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

    const url = route('forums_favorites.unactive', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: FAVORITE_FORUM_SHOW_REMOVE,
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

