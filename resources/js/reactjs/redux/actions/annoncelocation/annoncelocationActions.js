import {
    GET_CATEGORYANNONCELOCATIONS,
    GET_CITYANNONCELOCATIONS,
} from "../types";

import Swal from "sweetalert2";

export const loadCategoryannonces = () => dispatch => {

    dyaxios.get(route('api.categoryannoncelocation_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCELOCATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCityannonces = () => dispatch => {

    dyaxios.get(route('api.citiesannoncelocations_site'))
        .then(response => dispatch({
                type: GET_CITYANNONCELOCATIONS,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

