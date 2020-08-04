import {
    DELETE_FORUM,
    FAVORITE_FORUM_ADD,
    FAVORITE_FORUM_REMOVE,
    GET_CATEGORYFORUMS,
    GET_CATEGORYFORUMS_BY_USER,
    GET_FORUM_INTERESSE,
    LIKE_FORUM_ADD,
    LIKE_FORUM_REMOVE,
} from "../types";
import Swal from "sweetalert2";





export const loadCategoryforums = () => dispatch => {

    dyaxios.get(route('api.categoryforum_site'))
        .then(response => dispatch({
                type: GET_CATEGORYFORUMS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryforumsbyuser = () => dispatch => {

    dyaxios.get(route('api.categoryforum_byuser_site'))
        .then(response => dispatch({
                type: GET_CATEGORYFORUMS_BY_USER,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadforuminteresse = (props) => dispatch => {

    let itemCategoryforum = props.match.params.categoryforum;
    dyaxios.get(route('api.forumscategoryinteresse_site',[itemCategoryforum]))
        .then(response => dispatch({
                type: GET_FORUM_INTERESSE,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('forums_likes.active', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_FORUM_ADD,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const unlikeItem = props => dispatch => {

    const url = route('forums_likes.unactive', [props.id]);
    dyaxios.get(url).then(() => {

        dispatch({
            type: LIKE_FORUM_REMOVE,
            payload: props.id
        });

    }).catch(error => console.error(error))
};

export const favoriteItem = props => dispatch => {

    const url = route('forums_favorites.active', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: FAVORITE_FORUM_ADD,
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
                type: FAVORITE_FORUM_REMOVE,
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

export const deleteItem = props => dispatch => {

    Swal.fire({
        title: 'Confirmer la supression?',
        text: "êtes-vous sûr de vouloir executer cette action",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success",
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Oui, confirmer',
        cancelButtonText: 'Non, annuller',
        showCancelButton: true,
        reverseButtons: true,
    }).then((result) => {
        if (result.value) {

            const url = route('forumsdelete_site',[props.id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_FORUM,
                    payload: props.id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        // title: 'Update',
                        message: 'Post suprimée avec success'
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

