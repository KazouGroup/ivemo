import {
    GET_BLOGANNONCELOCATION_SHOW,
    LIKE_BLOGANNONCELOCATION_SHOW_ADD,
    LIKE_BLOGANNONCELOCATION_SHOW_REMOVE,
    FAVORITE_BLOGANNONCELOCATION_SHOW_ADD,
    FAVORITE_BLOGANNONCELOCATION_SHOW_REMOVE,
} from "../index";


export const loadBlogannoncelocationshow = (props) => dispatch => {

    let itemCategoryannoncelocation = props.match.params.categoryannoncelocation;
    let itemdate = props.match.params.date;
    let itemblogannoncelocation = props.match.params.blogannoncelocation;
    let url = route('api.blogannonceblogcategorylocationslug_site', [itemCategoryannoncelocation, itemdate, itemblogannoncelocation]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_BLOGANNONCELOCATION_SHOW,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const favoriteItem = props => dispatch => {

    const url = route('blogannoncelocations_favorites.favorite', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_BLOGANNONCELOCATION_SHOW_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unfavoriteItem = props => dispatch => {

    const url = route('blogannoncelocations_favorites.unactive', [props.id]);
    dyaxios.post(url).then(() => {

            dispatch({
                type: FAVORITE_BLOGANNONCELOCATION_SHOW_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const likeItem = props => dispatch => {

    const url = route('likeblogannoncelocations_likedata.likedata', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: LIKE_BLOGANNONCELOCATION_SHOW_ADD,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

export const unlikeItem = props => dispatch => {

    const url = route('likeblogannoncelocations_unlikedata.unlikedata', [props.id]);
    dyaxios.get(url).then(() => {

            dispatch({
                type: LIKE_BLOGANNONCELOCATION_SHOW_REMOVE,
                payload: props.id
            });

        }).catch(error => console.error(error));
};

