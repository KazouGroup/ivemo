import {
    GET_FORUM_SHOW_USER_SITE,
    FAVORITE_FORUM_SHOW_ADD,
    FAVORITE_FORUM_SHOW_REMOVE,
    LIKE_FORUM_SHOW_ADD,
    LIKE_FORUM_SHOW_REMOVE,
} from "../types";
import Swal from "sweetalert2";




export const loadforumshow = (props) => dispatch => {

    let itemCategoryforum = props.match.params.categoryforum;
    let itemForum = props.match.params.forum;
    let url = route('api.forumscategoryslugin_site', [itemCategoryforum, itemForum]);
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

