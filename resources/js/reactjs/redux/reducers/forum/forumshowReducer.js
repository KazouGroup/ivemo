
import produce from "immer"



const initialState = {
    item:{user:[],categoryforum:[]}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_FORUM_SHOW_USER_SITE':
                draft.item = action.payload;
                return;

            case 'FAVORITE_FORUM_SHOW_ADD':
                draft.item.favoriteted = action.payload;
                return draft;

            case 'FAVORITE_FORUM_SHOW_REMOVE':
                draft.item.favoriteted = !action.payload;
                return draft;

            case 'LIKE_FORUM_ADD':
                draft.item.likeked = action.payload;
                draft.item.countlikes ++;
                return draft;

            case 'LIKE_FORUM_REMOVE':
                draft.item.likeked = !action.payload;
                draft.item.countlikes --;
                return draft;
        }
    },
    initialState
)

