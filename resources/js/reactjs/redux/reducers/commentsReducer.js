import produce from "immer"


const initialState = {
    comments: { user: [], responsecomments: [] },
};


export default produce((draft, action = {}) => {
    switch (action.type) {
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
        case 'GET_COMMENTS_FORUMS':
            draft.comments = action.payload;
            return;
        case 'LIKE_COMMENT_ADD':
            const { payload } = action;
            let datalike = draft.comments.findIndex(i => i.id === payload);
            draft.comments[datalike].likeked = payload;
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
