import {
    GET_PROFILE_USER_FOR_PUBLIC,
    GET_AVISUSER_FOR_PUBLIC,
    UNACTIVE_AVISUSER,
    FOLLOWERUSER_ADD,
    FOLLOWERUSER_REMOVE,
    DELETE_AVISUSER, GET_FOLLOWERSUSERS, GET_FOLLOWINGSUSERS,
    FOLLOWERUSER_FOR_FOLLOWING_ADD, FOLLOWERUSER_FOR_FOLLOWING_REMOVE,
    FOLLOWERUSER_FOR_FOLLOWERS_ADD, FOLLOWERUSER_FOR_FOLLOWERS_REMOVE,
} from "./index";

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

export const loadFollowersusers = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.public_profile_followers_site',[itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_FOLLOWERSUSERS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadFollowingsusers = (props) => dispatch => {

    let itemuser = props.match.params.user;
    let url = route('api.public_profile_following_user',[itemuser]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_FOLLOWINGSUSERS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const followerForTableItem = (props) => dispatch => {


    let url = route('users_followeuser.follow',[props.user_id]);
    dyaxios.post(url)
        .then(() => dispatch({
                type: FOLLOWERUSER_FOR_FOLLOWERS_ADD,
                payload: props.user_id
            })
        ).catch(error => console.error(error));
};

export const unfollowerForTableItem = (props) => dispatch => {

    let url = route('users_followeuser.follow',[props.user_id]);
    dyaxios.post(url)
        .then(() => dispatch({
                type: FOLLOWERUSER_FOR_FOLLOWERS_REMOVE,
                payload: props.user_id
            })
        ).catch(error => console.error(error));
};

export const followeringForTableItem = (props) => dispatch => {


    let url = route('users_followeuser.follow',[props.member_id]);
    dyaxios.post(url)
        .then(() => dispatch({
                type: FOLLOWERUSER_FOR_FOLLOWING_ADD,
                payload: props.member_id
            })
        ).catch(error => console.error(error));
};

export const unfolloweringForTableItem = (props) => dispatch => {

    let url = route('users_followeuser.follow',[props.member_id]);
    dyaxios.post(url)
        .then(() => dispatch({
                type: FOLLOWERUSER_FOR_FOLLOWING_REMOVE,
                payload: props.member_id
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

    let url = route('users_followeuser.follow',[props.id]);
    dyaxios.post(url)
        .then(() => dispatch({
                type: FOLLOWERUSER_REMOVE,
                payload: props.id
            })
        ).catch(error => console.error(error));
};


export const deleteavisItem = (id) => dispatch => {

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

export const unactiveavisItem = (id) => dispatch => {

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
