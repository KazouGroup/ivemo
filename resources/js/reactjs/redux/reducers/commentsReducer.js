import produce from "immer"


const initialState = {
    comments: { user: [], responsecomments: [] },
};


export default produce((draft, action = {}) => {
    switch (action.type) {
        case 'GET_COMMENTS_ACTIVITYCITIES':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_ANNONCESLOCATIONS':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_ANNONCESRESERVATIONS':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_ANNONCESVENTES':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_BLOGANNONCERESERVATIONS':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_BLOGANNONCEVENTES':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_EMPLOYMENTS':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_CITIES':
            draft.comments = action.payload;
            return;

        case 'GET_COMMENTS_FORUMS':
            draft.comments = action.payload;
            return;

        case 'LIKE_COMMENT_ADD':
            let datalike = draft.comments.findIndex(i => i.id === action.payload);
            draft.comments[datalike].likeked = action.payload;
            draft.comments[datalike].likeked_count ++;
            return draft;

        case 'LIKE_COMMENT_REMOVE':
            let dataunlike = draft.comments.findIndex(i => i.id === action.payload);
            draft.comments[dataunlike].likeked = !action.payload;
            draft.comments[dataunlike].likeked_count --;
            return draft;

        case 'UNACTIVE_COMMENTS':
            let dataunactive = draft.comments.findIndex(i => i.id === action.payload);
            if (dataunactive !== -1) draft.comments.splice(dataunactive, 1);
            return draft;

        case 'DELETE_COMMENTS':
            let datadelete = draft.comments.findIndex(i => i.id === action.payload);
            if (datadelete !== -1) draft.comments.splice(datadelete, 1);
            return draft;

    }
},
    initialState
)
