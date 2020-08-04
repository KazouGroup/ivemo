import produce from "immer"

const initialState = {
    blogannoncelocation: {user: [], categoryannoncelocation: []},
    blogannoncelocations: {categoryannoncelocation: [], user: []},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            //Cette partie c'est pour la page show
            case 'GET_BLOGANNONCELOCATION_SHOW':
                draft.blogannoncelocation = action.payload;
                return;

            case 'FAVORITE_BLOGANNONCELOCATION_SHOW_ADD':
                draft.blogannoncelocation.favoriteted = action.payload;
                draft.blogannoncelocation.countfavorites ++;
                return draft;

            case 'FAVORITE_BLOGANNONCELOCATION_SHOW_REMOVE':
                draft.blogannoncelocation.favoriteted = !action.payload;
                draft.blogannoncelocation.countfavorites --;
                return draft;

            case 'LIKE_BLOGANNONCELOCATION_SHOW_ADD':
                draft.blogannoncelocation.likeked = action.payload;
                draft.blogannoncelocation.countlikes ++;
                return draft;

            case 'LIKE_BLOGANNONCELOCATION_SHOW_REMOVE':
                draft.blogannoncelocation.likeked = !action.payload;
                draft.blogannoncelocation.countlikes --;
                return draft;

            //Ici c'est pour toutes les pages
            case 'GET_BLOGANNONCELOCATION_INTERESSE':
                draft.blogannoncelocations = action.payload;
                return;

            case 'LIKE_BLOGANNONCELOCATION_ADD':
                let datalkdd = draft.blogannoncelocations.findIndex(i => i.id === action.payload);
                let datalkddget = draft.blogannoncelocations[datalkdd];
                if (datalkdd !== -1) datalkddget.likeked = action.payload;
                if (datalkdd !== -1) datalkddget.countlikes ++;
                return draft;

            case 'LIKE_BLOGANNONCELOCATION_REMOVE':
                let datalkremove = draft.blogannoncelocations.findIndex(i => i.id === action.payload);
                let datalkremoveget = draft.blogannoncelocations[datalkremove];
                if (datalkremove !== -1) datalkremoveget.likeked = !action.payload;
                if (datalkremove !== -1) datalkremoveget.countlikes --;
                return draft;

            case 'FAVORITE_BLOGANNONCELOCATION_ADD':
                let datadd = draft.blogannoncelocations.findIndex(i => i.id === action.payload);
                let dataddget = draft.blogannoncelocations[datadd];
                if (datadd !== -1) dataddget.favoriteted = action.payload;
                if (datadd !== -1) dataddget.countfavorites ++;
                return draft;

            case 'FAVORITE_BLOGANNONCELOCATION_REMOVE':
                let dataremove = draft.blogannoncelocations.findIndex(i => i.id === action.payload);
                let dataremoveget = draft.blogannoncelocations[dataremove];
                if (dataremove !== -1) dataremoveget.favoriteted = !action.payload;
                if (dataremove !== -1) dataremoveget.countfavorites --;
                return draft;

            case 'UNACTIVE_BLOGANNONCELOCATION':
                let dataunactive = draft.blogannoncelocations.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.blogannoncelocations.splice(dataunactive, 1);
                return draft;

            case 'DELETE_BLOGANNONCELOCATION':
                let datadelete = draft.blogannoncelocations.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.blogannoncelocations.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

