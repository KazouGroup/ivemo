
import produce from "immer"

const initialState = {
    city: {},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CITY_SHOW':
                draft.city = action.payload;
                return;

            case 'LIKE_CITY_ADD':
                draft.city.likeked = action.payload;
                draft.city.countlikes ++;
                return draft;

            case 'LIKE_CITY_REMOVE':
                draft.city.likeked = !action.payload;
                draft.city.countlikes --;
                return draft;
        }
    },
    initialState
)

