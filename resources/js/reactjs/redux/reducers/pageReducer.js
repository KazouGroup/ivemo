
import produce from "immer"

const initialState = {
    city: {},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CITY_SHOW':
                draft.city = action.payload;
                return;
        }
    },
    initialState
)

