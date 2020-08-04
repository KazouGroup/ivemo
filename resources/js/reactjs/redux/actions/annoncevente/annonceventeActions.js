import {
    GET_CATEGORYANNONCEVENTES,
    GET_CITYANNONCEVENTES,
    GET_CATEGORYANNONCEVENTES_BY_CITY,
} from "../types";

import Swal from "sweetalert2";

export const loadCategoryannonces = () => dispatch => {

    dyaxios.get(route('api.categoryannoncevente_site'))
        .then(response => dispatch({
                type: GET_CATEGORYANNONCEVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCityannonces = () => dispatch => {

    dyaxios.get(route('api.citiesannonceventes_site'))
        .then(response => dispatch({
                type: GET_CITYANNONCEVENTES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};

export const loadCategoryannoncesbycity = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let url = route('api.categoryannonceventebycity_site',[itemCity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_CATEGORYANNONCEVENTES_BY_CITY,
                payload: response.data
            })
        ).catch(error => console.error(error));
};
