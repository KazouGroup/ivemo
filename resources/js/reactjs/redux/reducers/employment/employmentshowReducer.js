
import produce from "immer"



const initialState = {
    item:{categoryemployment:[],user:{profile:[]},city:[]},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_EMPLOYEMENT_SHOW_USER_SITE':
                draft.item = action.payload;
                return;

            case 'STATUS_COMMENT_EMPLOYMENT_ADD':
                draft.item.status_comments = action.payload;
                return draft;

            case 'STATUS_COMMENT_EMPLOYMENT_REMOVE':
                draft.item.status_comments = !action.payload;
                return draft;

            case 'FAVORITE_EMPLOYEMENT_SHOW_ADD':
                draft.item.favoriteted = action.payload;
                return draft;

            case 'FAVORITE_EMPLOYEMENT_SHOW_REMOVE':
                draft.item.favoriteted = !action.payload;
                return draft;

            case 'LIKE_EMPLOYEMENT_ADD':
                draft.item.likeked = action.payload;
                return draft;

            case 'LIKE_EMPLOYEMENT_REMOVE':
                draft.item.likeked = !action.payload;
                return draft;
        }
    },
    initialState
)

