import {
    GET_CITY_SHOW,
} from "./types";

import Swal from "sweetalert2";


export const loadCityItemshow = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let url = route('api.city_site', [itemCity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_CITY_SHOW,
                payload: response.data
            })
        ).catch(error => console.error(error));
};
