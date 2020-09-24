import produce from "immer"

const initialState = {
    item: {annoncetype: [],periodeannonce:[], categoryannoncelocation: [], city: [],user: {profile:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_ANNONCELOCATION_SHOW_USER_SITE':
                draft.item = action.payload;
                return;

            case 'STATUS_COMMENT_ANNONCELOCATION_ADD':
                draft.item.status_comments = action.payload;
                return draft;

            case 'STATUS_COMMENT_ANNONCELOCATION_REMOVE':
                draft.item.status_comments = !action.payload;
                return draft;

            case 'FAVORITE_ANNONCELOCATION_SHOW_ADD':
                draft.item.favoriteted = action.payload;
                return draft;

            case 'FAVORITE_ANNONCELOCATION_SHOW_REMOVE':
                draft.item.favoriteted = !action.payload;
                return draft;

            case 'LIKE_ANNONCELOCATION_ADD':
                draft.item.likeked = action.payload;
                return draft;

            case 'LIKE_ANNONCELOCATION_REMOVE':
                draft.item.likeked = !action.payload;
                return draft;
        }
    },
    initialState
)

