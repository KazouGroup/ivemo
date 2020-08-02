import {
    GET_AVISUSER_FOR_PUBLIC,
    UNACTIVE_AVISUSER,
    DELETE_AVISUSER,
} from "./types";

import Swal from "sweetalert2";

export const loadAvisusersforpublic = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.avisuserpublique',[itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_AVISUSER_FOR_PUBLIC,
                payload: response.data
            })
        ).catch(error => console.error(error));
};


export const deleteItem = (id) => dispatch => {

    Swal.fire({
        title: 'Confirmer la supression?',
        text: "êtes-vous sûr de vouloir executer cette action?",
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

            const url = route('profile_avis_users_destroy.site', [id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_AVISUSER,
                    payload: id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        // title: 'Update',
                        message: 'Commentaire suprimée avec succès'
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
            }).catch((error) => {
                console.error(error);
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

export const unactiveItem = (id) => dispatch => {

    Swal.fire({
        title: 'Confirmer masquer?',
        text: "êtes-vous sûr de vouloir executer cette action?",
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

            const url = route('profile_avis_users_unactivated.site', [id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_AVISUSER,
                    payload: id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        //,
                        message: 'L\'avis à été désactivé avec succès'
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
            }).catch((error) => {
                console.error(error);
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
