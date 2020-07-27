import {GET_WORKWITHUSES, GET_WORKWITHUSES_BY_CATEGORIES,GET_WORKWITHUSES_SHOW} from "./types";


export const loadItems = () => dispatch => {

    dyaxios.get(route('api.work_with_us_site')).then(response => dispatch({
            type: GET_WORKWITHUSES,
            payload: response.data
        })
    ).catch(error => console.error(error));
};

export const loadItemsbycategories = (props) => dispatch => {

    let itemCategoryworkwithus = props.match.params.categoryworkwithus;
    dyaxios.get(route('api.work_with_uscategoryworkwithus_site', [itemCategoryworkwithus]))
        .then(response => dispatch({
                type: GET_WORKWITHUSES_BY_CATEGORIES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadItemshow = (props) => dispatch => {

    let itemWorkwithus = props.match.params.workwithus;
    let itemCategoryworkwithus = props.match.params.categoryworkwithus;
    let url = route('api.work_with_us_show_site',[itemCategoryworkwithus,itemWorkwithus]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_WORKWITHUSES_SHOW,
                payload: response.data
            })
        ).catch(error => console.error(error));
};
