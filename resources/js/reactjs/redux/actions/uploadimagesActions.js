import {
    GET_UPLOADIMAGES_ACTIVITYCITIES,
} from "./types";

import Swal from "sweetalert2";



export const loadUploadimageActivitycities = (props) => dispatch => {

    let itemCity = props.match.params.city;
    let itemActivitycity = props.match.params.activitycity;
    let url = route('api.citygetuploadimage_site', [itemCity,itemActivitycity]);
    dyaxios.get(url)
        .then(response => dispatch({
                type: GET_UPLOADIMAGES_ACTIVITYCITIES,
                payload: response.data
            })
        ).catch(error => console.error(error));
};
