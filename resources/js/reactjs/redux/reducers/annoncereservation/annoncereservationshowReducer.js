import produce from "immer"

const initialState = {
    item: {annoncetype:[],categoryannoncereservation:[],periodeannonce:[],user:{profile:[]},imagereservations:[]},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_ANNONCERESERVATION_SHOW_USER_SITE':
                draft.item = action.payload;
                return;

            case 'STATUS_COMMENT_ANNONCERESERVATION_ADD':
                draft.item.status_comments = action.payload;
                return draft;

            case 'STATUS_COMMENT_ANNONCERESERVATION_REMOVE':
                draft.item.status_comments = !action.payload;
                return draft;

            case 'FAVORITE_ANNONCERESERVATION_SHOW_ADD':
                draft.item.favoriteted = action.payload;
                return draft;

            case 'FAVORITE_ANNONCERESERVATION_SHOW_REMOVE':
                draft.item.favoriteted = !action.payload;
                return draft;

            case 'LIKE_ANNONCERESERVATION_ADD':
                draft.item.likeked = action.payload;
                return draft;

            case 'LIKE_ANNONCERESERVATION_REMOVE':
                draft.item.likeked = !action.payload;
                return draft;
        }
    },
    initialState
)

