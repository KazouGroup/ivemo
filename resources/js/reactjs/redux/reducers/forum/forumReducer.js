
import produce from "immer"



const initialState = {
    categoryforums:{}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYFORUMS':
                draft.categoryforums = action.payload;
                return;

            case 'GET_CATEGORYFORUMS_BY_USER':
                draft.categoryforums = action.payload;
                return;
        }
    },
    initialState
)

