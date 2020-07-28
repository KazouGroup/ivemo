import {
    GET_CATEGORYFORUMS,
    GET_CATEGORYFORUMS_BY_USER,
} from "../types";
import Swal from "sweetalert2";





export const loadCategoryforums = () => dispatch => {

    dyaxios.get(route('api.categoryforum_site'))
        .then(response => dispatch({
                type: GET_CATEGORYFORUMS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryforumsbyuser = () => dispatch => {

    dyaxios.get(route('api.categoryforum_byuser_site'))
        .then(response => dispatch({
                type: GET_CATEGORYFORUMS_BY_USER,
                payload: response.data
            })
        ).catch(error => console.error(error));
};
