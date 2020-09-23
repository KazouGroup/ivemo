import {
    GET_ALL_FAVORITES_BY_USER,
    DELETE_FAVORITES_FORUMS,
    DELETE_FAVORITES_EMPLOYMENTS,
} from "./index";

import Swal from "sweetalert2";


export const loadAllfovoriteuser = () => dispatch => {

    let url = route('api.personal_settings_favoritesuses_site');
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_ALL_FAVORITES_BY_USER,
            payload: response.data
        })
    ).catch(error => console.error(error));
};

export const unfavoritemploymentItem = (props) => dispatch => {

    Swal.fire({
        title: 'Retirer cette annonce?',
        text: "êtes vous sure de vouloir retirer cette annonce de vos favoris?",
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
            let url = route('personal_favorites_delete.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_FAVORITES_EMPLOYMENTS,
                    payload: props
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: "Annonce retirée de vos favoris",
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

export const unfavoriteforumItem = (props) => dispatch => {

    Swal.fire({
        title: 'Retirer cette annonce?',
        text: "êtes vous sure de vouloir retirer cette annonce de vos favoris?",
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
            let url = route('personal_favorites_delete.site',[props.id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_FAVORITES_FORUMS,
                    payload: props
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: "Annonce retirée de vos favoris",
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
