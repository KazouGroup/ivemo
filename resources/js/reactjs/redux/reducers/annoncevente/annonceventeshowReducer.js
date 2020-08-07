import produce from "immer"

const initialState = {
    item: {annoncetype:[],categoryannoncevente:[],user:{profile:[]},imagereservations:[]},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_ANNONCEVENTE_SHOW_USER_SITE':
                draft.item = action.payload;
                return;

            case 'STATUS_COMMENT_ANNONCEVENTE_ADD':
                draft.item.status_comments = action.payload;
                return draft;

            case 'STATUS_COMMENT_ANNONCEVENTE_REMOVE':
                draft.item.status_comments = !action.payload;
                return draft;

            case 'FAVORITE_ANNONCEVENTE_SHOW_ADD':
                draft.item.favoriteted = action.payload;
                return draft;

            case 'FAVORITE_ANNONCEVENTE_SHOW_REMOVE':
                draft.item.favoriteted = !action.payload;
                return draft;

            case 'LIKE_ANNONCEVENTE_ADD':
                draft.item.likeked = action.payload;
                return draft;

            case 'LIKE_ANNONCEVENTE_REMOVE':
                draft.item.likeked = !action.payload;
                return draft;
        }
    },
    initialState
)

