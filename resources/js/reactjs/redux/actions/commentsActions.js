import {
    GET_COMMENTS_ANNONCESLOCATIONS,
    GET_COMMENTS_ANNONCESRESERVATIONS,
    GET_COMMENTS_ANNONCESVENTES,
    GET_COMMENTS_BLOGANNONCERESERVATIONS,
    GET_COMMENTS_BLOGANNONCEVENTES,
    GET_COMMENTS_EMPLOYMENTS,
    GET_COMMENTS_FORUMS,
    LIKE_COMMENT_ADD,
    LIKE_COMMENT_REMOVE,
    UNACTIVE_COMMENTS,
    DELETE_COMMENTS,
} from "./types";

import Swal from "sweetalert2";

export const loadCommentsAnnoncelocationcomments = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let itemCity = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemannoncelocation = props.match.params.annoncelocation;
    let url = route('api.annoncelocationgetcomment_site',[itemannoncetype,itemCategoryannoncelocation,itemCity,itemuser,itemannoncelocation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_ANNONCESLOCATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCommentsAnnoncereservationcomments = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncereservation = props.match.params.categoryannoncereservation;
    let itemcityannonce = props.match.params.city;
    let itemannoncereservation = props.match.params.annoncereservation;
    let url = route('api.annoncereservationgetcomment_site',[itemannoncetype,itemCategoryannoncereservation,itemcityannonce,itemannoncereservation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_ANNONCESRESERVATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCommentsAnnonceventes = (props) => dispatch => {

    let itemannoncetype = props.match.params.annoncetype;
    let itemCategoryannoncevente = props.match.params.categoryannoncevente;
    let itemcityannonce = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemannoncevente = props.match.params.annoncevente;
    let url = route('api.annonceventegetcomment_site',[itemannoncetype,itemCategoryannoncevente,itemcityannonce,itemuser,itemannoncevente]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_ANNONCESVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCommentsBlogannoncereservations = (props) => dispatch => {

    let itemCategoryannoncereservation = props.match.params.categoryannoncereservation;
    let itemdate = props.match.params.date;
    let itemblogannoncereservation = props.match.params.blogannoncereservation;
    let url = route('api.blogannoncereservationgetcomment_site',[itemCategoryannoncereservation,itemdate,itemblogannoncereservation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_BLOGANNONCERESERVATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCommentsBlogannonceventes = (props) => dispatch => {

    let itemCategoryannoncevente = props.match.params.categoryannoncevente;
    let itemdate = props.match.params.date;
    let itemblogannonvente = props.match.params.blogannoncevente;
    let url = route('api.blogannoncesventegetcomment_site',[itemCategoryannoncevente,itemdate,itemblogannonvente]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_BLOGANNONCEVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCommentsEmployments = (props) => dispatch => {

    let itemCategoryemployment = props.match.params.categoryemployment;
    let itemCity = props.match.params.city;
    let itemuser = props.match.params.user;
    let itemEmployment = props.match.params.employment;
    let url = route('api.employmentgetcomment_site',[itemCategoryemployment,itemCity,itemuser,itemEmployment]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_EMPLOYMENTS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCommentsForums = (props) => dispatch => {

    let itemCategoryforum = props.match.params.categoryforum;
    let itemuser = props.match.params.user;
    let itemForum = props.match.params.forum;
    let url = route('api.forumgetcomment_site', [itemCategoryforum,itemuser, itemForum]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_COMMENTS_FORUMS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const likeItem = (props) => dispatch => {


    let url = route('comments_likes.active', [props.id]);
    dyaxios.get(url)
        .then(() =>

            dispatch({
                type: LIKE_COMMENT_ADD,
                payload: props.id,
            })
        ).catch(error => console.error(error));
};

export const unlikeItem = (props) => dispatch => {


    let url = route('comments_likes.unactive', [props.id]);
    dyaxios.get(url)
        .then(() =>

            dispatch({
                type: LIKE_COMMENT_REMOVE,
                payload: props.id,
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

            const url = route('comments.destroy', [id]);
            //Envoyer la requet au server
            dyaxios.delete(url).then(() => {

                dispatch({
                    type: DELETE_COMMENTS,
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

            const url = route('comments.unactive', [id]);
            //Envoyer la requet au server
            dyaxios.get(url).then(() => {

                dispatch({
                    type: UNACTIVE_COMMENTS,
                    payload: id
                });

                /** Alert notify bootstrapp **/
                $.notify({
                        //,
                        message: 'Le commenaire à été desactivé avec succès'
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
