import {
    GET_EMPLOYEMENT_SHOW_USER_SITE,
    STATUS_COMMENT_EMPLOYMENT_ADD,
    STATUS_COMMENT_EMPLOYMENT_REMOVE,
    LIKE_EMPLOYEMENT_ADD,
    LIKE_EMPLOYEMENT_REMOVE,
    FAVORITE_EMPLOYEMENT_SHOW_ADD,
    FAVORITE_EMPLOYEMENT_SHOW_REMOVE,
    FAVORITE_EMPLOYEMENT_ADD,
    FAVORITE_EMPLOYEMENT_REMOVE,
} from "../types";
import Swal from "sweetalert2";


export const loademploymentshowusersite = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let itemCity = props.match.params.city;
    let itemEmployment = props.match.params.employment;
    let url = route('api.employmentsbycategorybycityslug_site', [itemCategoryemployment, itemCity, itemEmployment]);
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
            let url = route('employments_desactive_comments_site', [props.id]);
            dyaxios.get(url).then(() => {

                dispatch({
                    type: STATUS_COMMENT_EMPLOYMENT_REMOVE,
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
                type: FAVORITE_EMPLOYEMENT_SHOW_REMOVE,
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
