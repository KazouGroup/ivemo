import {GET_WORKWITHUSES, GET_WORKWITHUSES_BY_CATEGORIES,GET_WORKWITHUSES_SHOW} from "../actions/types";

const initialState = {
    items: [],
    item: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WORKWITHUSES:
            return {
                ...state,
                items: action.payload,
            };
        case GET_WORKWITHUSES_BY_CATEGORIES:
            return {
                ...state,
                items: action.payload,
            };
        case GET_WORKWITHUSES_SHOW:
            return {
                ...state,
                item: action.payload,
            };
        default:
            return state;
    }

}
