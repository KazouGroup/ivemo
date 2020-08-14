import {
    GET_RED_CONTACTSERVICEMPLOYMENT_SHOW,
    GET_RED_CONTACTSERVICEMPLOYMENT,
    FAVORITE_CONTACTSERVICE_ADD,
    FAVORITE_CONTACTSERVICE_REMOVE,
    ARCHVEMENT_CONTACTSERVICE_ADD,
    ARCHVEMENT_CONTACTSERVICE_REMOVE,
    ACTIVE_CONTACTSERVICE_ADD,
    ACTIVE_CONTACTSERVICE_REMOVE,
    UNACTIVE_ANNONCE_EMPLOYMENT,
    ACTIVE_ANNONCE_EMPLOYMENT,
    DELETE_CONTACTSERVICE,
} from "./types";
import Swal from "sweetalert2";
import {history} from "../utils/history"


{/* Bon ici on dois faire beaucoup attention*/
}

export const activecontactaddItem = id => dispatch => {

    const url = route('contactservice_statusred', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_CONTACTSERVICE_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const activecontactremoveItem = id => dispatch => {

    const url = route('contactservice_statusred', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_CONTACTSERVICE_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const archvementaddItem = id => dispatch => {

    const url = route('contactservice_statusarchvement', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ARCHVEMENT_CONTACTSERVICE_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const archvementremoveItem = id => dispatch => {

    const url = route('contactservice_statusarchvement', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ARCHVEMENT_CONTACTSERVICE_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteaddItem = id => dispatch => {

    const url = route('contactservice_favorite', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_CONTACTSERVICE_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteremoveItem = id => dispatch => {

    const url = route('contactservice_unfavorite', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_CONTACTSERVICE_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const activeItem = id => dispatch => {

    Swal.fire({
        title: 'Afficher cette annonce?',
        text: "êtes vous sure de vouloir confirmer cette action?",
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

            //Envoyer la requet au server
            const url = route('employmentsactivated_site', [id]);
            dyaxios.get(url).then(() => {

                dispatch({
                    type: ACTIVE_ANNONCE_EMPLOYMENT,
                    payload: id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        message: "Cette annonce est desormais visible aux utilisateurs",
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

                //Failled message
                $.notify("Ooop! Something wrong. Try later", {
                    type: 'danger',
                    animate: {
                        enter: 'animated bounceInDown',
                        exit: 'animated bounceOutUp'
                    }
                });
            })
        }
    });
};

export const unactiveprivateItem = id => dispatch => {

    Swal.fire({
        title: 'Masquer cette annonce?',
        text: "êtes vous sure de vouloir confirmer cette action?",
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

            //Envoyer la requet au server
            const url = route('employmentsunactivated_site', [id]);
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_ANNONCE_EMPLOYMENT,
                    payload: id
                });

                /** Alert notify bootstrapp **/
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
                /** End alert ***/

            }).catch((error) => {

                //Failled message
                $.notify("Ooop! Something wrong. Try later", {
                    type: 'danger',
                    animate: {
                        enter: 'animated bounceInDown',
                        exit: 'animated bounceOutUp'
                    }
                });
            })
        }
    });
};

export const deletecontactItem = id => dispatch => {

    Swal.fire({
        title: 'Confirmer la supression?',
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

            const url = route('contactservicedelete', [id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_CONTACTSERVICE,
                    payload: id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        // title: 'Update',
                        message: 'Annonce suprimée avec success'
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

export const loadContactserviceemploymentsredmessage = props => dispatch => {

    let itemUser = props.match.params.user;
    let itemContactservice = props.match.params.contactservice;
    let url = route('api.contactservice_employmentsbyuserbystatistiqueshow_site', [itemUser, itemContactservice]);
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_RED_CONTACTSERVICEMPLOYMENT_SHOW,
            payload: response.data
        })
    ).catch(error => console.error(error));
};

export const loadContactserviceemploymentshow = props => dispatch => {

    let itemUser = props.match.params.user;
    let itemEmployment = props.match.params.employment;
    let url = route('api.contactservice_employmentsbyuserbystatistique_site', [itemUser,itemEmployment]);
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_RED_CONTACTSERVICEMPLOYMENT,
            payload: response.data
        })
    ).catch(error => console.error(error));
};
