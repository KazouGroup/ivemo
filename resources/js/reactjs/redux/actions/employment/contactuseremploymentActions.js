import {
    GET_ALL_CONTACTSERVICE,
    ARCHVEMENT_CONTACTSERVICE_EMPLOYMENT_ADD,
    ARCHVEMENT_CONTACTSERVICE_EMPLOYMENT_REMOVE,
    FAVORITE_CONTACTSERVICE_EMPLOYMENT_ADD,
    FAVORITE_CONTACTSERVICE_EMPLOYMENT_REMOVE,
    ACTIVE_CONTACTSERVICE_EMPLOYMENT_ADD,
    ACTIVE_CONTACTSERVICE_EMPLOYMENT_REMOVE,
    DELETE_CONTACTSERVICE_EMPLOYMENT,
} from "../index";
import Swal from "sweetalert2";


export const activecontactaddItem = id => dispatch => {

    const url = route('contactservice_statusred', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_CONTACTSERVICE_EMPLOYMENT_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const activecontactremoveItem = id => dispatch => {

    const url = route('contactservice_statusred', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ACTIVE_CONTACTSERVICE_EMPLOYMENT_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};


export const archvementaddItem = id => dispatch => {

    const url = route('contactservice_statusarchvement', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ARCHVEMENT_CONTACTSERVICE_EMPLOYMENT_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const archvementremoveItem = id => dispatch => {

    const url = route('contactservice_statusarchvement', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: ARCHVEMENT_CONTACTSERVICE_EMPLOYMENT_REMOVE,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteaddItem = id => dispatch => {

    const url = route('contactservice_favorite', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_CONTACTSERVICE_EMPLOYMENT_ADD,
                payload: id
            });
        }
    ).catch(error => console.error(error));
};

export const favoriteremoveItem = id => dispatch => {

    const url = route('contactservice_unfavorite', [id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_CONTACTSERVICE_EMPLOYMENT_REMOVE,
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

            const url = route('contactservicedelete', [id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_CONTACTSERVICE_EMPLOYMENT,
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

export const loadAllcontactservices = props => dispatch => {

    let url = route('api.personal_mails_contactservices_site');
    dyaxios.get(url).then(response =>
        dispatch({
            type: GET_ALL_CONTACTSERVICE,
            payload: response.data
        })
    ).catch(error => console.error(error));
};
