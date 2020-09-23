import {
    GET_RED_CONTACTUSER_SHOW,
    ACTIVE_NOTIFICATION_RED,
    FAVORITE_CONTACTUSER_ADD,
    FAVORITE_CONTACTUSER_REMOVE,
    ARCHVEMENT_CONTACTUSER_ADD,
    ARCHVEMENT_CONTACTUSER_REMOVE,
    ACTIVE_CONTACTUSER_ADD,
    ACTIVE_CONTACTUSER_REMOVE,
    DELETE_CONTACTUSER, GET_ALL_CONTACTSERVICE,
} from "./index";
import Swal from "sweetalert2";
import {history} from "../utils/history"


{/* Bon ici on dois faire beaucoup attention*/
}

export const activecontactaddItem = id => dispatch => {

    const url = route('personal_contactusers_mails_active.site', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_CONTACTUSER_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const activecontactremoveItem = id => dispatch => {

    const url = route('personal_contactusers_mails_unactive.site', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_CONTACTUSER_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const archvementaddItem = id => dispatch => {

    const url = route('personal_contactusers_mails_archvement.site', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ARCHVEMENT_CONTACTUSER_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const archvementremoveItem = id => dispatch => {

    const url = route('personal_contactusers_mails_unarchvement.site', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ARCHVEMENT_CONTACTUSER_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteaddItem = id => dispatch => {

    const url = route('personal_contactusers_mails_favorite.site', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_CONTACTUSER_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteremoveItem = id => dispatch => {

    const url = route('personal_contactusers_mails_unfavorite.site', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_CONTACTUSER_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
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

            const url = route('personal_contactusers_mails_delete.site', [id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_CONTACTUSER,
                    payload: id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        // title: 'Update',
                        message: 'message suprimée avec success'
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

export const loadAllcontactservices = props => dispatch => {

    let url = route('api.personal_mails_contactservices_site');
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_ALL_CONTACTSERVICE,
            payload: response.data
        })
    ).catch(error => console.error(error));
};

export const readnotificationItem = props => dispatch => {

    const url = route('contactservices_notification_red', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_NOTIFICATION_RED,
                payload: props.id
            });
        }
    ).catch(error => console.error(error));
};

export const loadContactusersshow = props => dispatch => {

    let itemuser = props.match.params.user;
    let itemcontactuser = props.match.params.contactuser;
    let url = route('api.personal_mails_contacts_show.site', [itemuser,itemcontactuser]);
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_RED_CONTACTUSER_SHOW,
            payload: response.data
        })
    ).catch(error => console.error(error));
};
