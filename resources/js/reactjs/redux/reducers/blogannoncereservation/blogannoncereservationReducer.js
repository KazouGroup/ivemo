import produce from "immer"

const initialState = {
    blogannoncereservation: {categoryannoncereservation:[],user:[]},
    blogannoncereservations: {categoryannoncereservation: [], user: []},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            //Cette partie c'est pour la page show
            case 'GET_BLOGANNONCERESERVATION_SHOW':
                draft.blogannoncereservation = action.payload;
                return;

            case 'FAVORITE_BLOGANNONCERESERVATION_SHOW_ADD':
                draft.blogannoncereservation.favoriteted = action.payload;
                draft.blogannoncereservation.countfavorites ++;
                return draft;

            case 'FAVORITE_BLOGANNONCERESERVATION_SHOW_REMOVE':
                draft.blogannoncereservation.favoriteted = !action.payload;
                draft.blogannoncereservation.countfavorites --;
                return draft;

            case 'LIKE_BLOGANNONCERESERVATION_SHOW_ADD':
                draft.blogannoncereservation.likeked = action.payload;
                draft.blogannoncereservation.countlikes ++;
                return draft;

            case 'LIKE_BLOGANNONCERESERVATION_SHOW_REMOVE':
                draft.blogannoncereservation.likeked = !action.payload;
                draft.blogannoncereservation.countlikes --;
                return draft;

            //Ici c'est pour toutes les pages
            case 'GET_BLOGANNONCERESERVATION_INTERESSE':
                draft.blogannoncereservations = action.payload;
                return;

            case 'LIKE_BLOGANNONCERESERVATION_ADD':
                let datalkdd = draft.blogannoncereservations.findIndex(i => i.id === action.payload);
                let datalkddget = draft.blogannoncereservations[datalkdd];
                if (datalkdd !== -1) datalkddget.likeked = action.payload;
                if (datalkdd !== -1) datalkddget.countlikes ++;
                return draft;

            case 'LIKE_BLOGANNONCERESERVATION_REMOVE':
                let datalkremove = draft.blogannoncereservations.findIndex(i => i.id === action.payload);
                let datalkremoveget = draft.blogannoncereservations[datalkremove];
                if (datalkremove !== -1) datalkremoveget.likeked = !action.payload;
                if (datalkremove !== -1) datalkremoveget.countlikes --;
                return draft;

            case 'FAVORITE_BLOGANNONCERESERVATION_ADD':
                let datadd = draft.blogannoncereservations.findIndex(i => i.id === action.payload);
                let dataddget = draft.blogannoncereservations[datadd];
                if (datadd !== -1) dataddget.favoriteted = action.payload;
                if (datadd !== -1) dataddget.countfavorites ++;
                return draft;

            case 'FAVORITE_BLOGANNONCERESERVATION_REMOVE':
                let dataremove = draft.blogannoncereservations.findIndex(i => i.id === action.payload);
                let dataremoveget = draft.blogannoncereservations[dataremove];
                if (dataremove !== -1) dataremoveget.favoriteted = !action.payload;
                if (dataremove !== -1) dataremoveget.countfavorites --;
                return draft;

            case 'UNACTIVE_BLOGANNONCERESERVATION':
                let dataunactive = draft.blogannoncereservations.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.blogannoncereservations.splice(dataunactive, 1);
                return draft;

            case 'DELETE_BLOGANNONCERESERVATION':
                let datadelete = draft.blogannoncereservations.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.blogannoncereservations.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

