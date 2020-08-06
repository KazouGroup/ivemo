import produce from "immer"


const initialState = {
    forums: {user: [], categoryforum: []},
    categoryforums: {}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYFORUMS':
                draft.categoryforums = action.payload;
                return;

            case 'GET_CATEGORYFORUMS_BY_USER':
                draft.categoryforums = action.payload;
                return;

            case 'GET_FORUM_ALL_SITE':
                draft.forums = action.payload;
                return;

            case 'GET_FORUM_BY_PRIVATE_USER':
                draft.forums = action.payload;
                return;

            case 'GET_FORUM_BY_CATEGORY':
                draft.forums = action.payload;
                return;

            case 'GET_FORUM_INTERESSE':
                draft.forums = action.payload;
                return;

            case 'LIKE_FORUM_ADD':
                let datalkdd = draft.forums.findIndex(i => i.id === action.payload);
                if (datalkdd !== -1) draft.forums[datalkdd].likeked = action.payload;
                if (datalkdd !== -1) draft.forums[datalkdd].countlikes ++;
                return draft;

            case 'LIKE_FORUM_REMOVE':
                let datalkremove = draft.forums.findIndex(i => i.id === action.payload);
                if (datalkremove !== -1) draft.forums[datalkremove].likeked = !action.payload;
                if (datalkremove !== -1) draft.forums[datalkremove].countlikes --;
                return draft;

            case 'FAVORITE_FORUM_ADD':
                let datadd = draft.forums.findIndex(i => i.id === action.payload);
                if (datadd !== -1) draft.forums[datadd].favoriteted = action.payload;
                if (datadd !== -1) draft.forums[datadd].countfavorites ++;
                return draft;

            case 'FAVORITE_FORUM_REMOVE':
                let dataremove = draft.forums.findIndex(i => i.id === action.payload);
                if (dataremove !== -1) draft.forums[dataremove].favoriteted = !action.payload;
                if (dataremove !== -1) draft.forums[dataremove].countfavorites --;
                return draft;

            case 'DELETE_FORUM':
                let datadelete = draft.forums.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.forums.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

