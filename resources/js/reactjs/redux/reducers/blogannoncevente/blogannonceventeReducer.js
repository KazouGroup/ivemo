import produce from "immer"

const initialState = {
    blogannoncevente: {categoryannoncevente:[],user:[]},
    blogannonceventes: {categoryannoncevente: [], user: []},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            //Cette partie c'est pour la page show
            case 'GET_BLOGANNONCEVENTE_SHOW':
                draft.blogannoncevente = action.payload;
                return;

            case 'FAVORITE_BLOGANNONCEVENTE_SHOW_ADD':
                draft.blogannoncevente.favoriteted = action.payload;
                draft.blogannoncevente.countfavorites ++;
                return draft;

            case 'FAVORITE_BLOGANNONCEVENTE_SHOW_REMOVE':
                draft.blogannoncevente.favoriteted = !action.payload;
                draft.blogannoncevente.countfavorites --;
                return draft;

            case 'LIKE_BLOGANNONCEVENTE_SHOW_ADD':
                draft.blogannoncevente.likeked = action.payload;
                draft.blogannoncevente.countlikes ++;
                return draft;

            case 'LIKE_BLOGANNONCEVENTE_SHOW_REMOVE':
                draft.blogannoncevente.likeked = !action.payload;
                draft.blogannoncevente.countlikes --;
                return draft;

            //Ici c'est pour toutes les pages
            case 'GET_BLOGANNONCEVENTE_INTERESSE':
                draft.blogannonceventes = action.payload;
                return;

            case 'LIKE_BLOGANNONCEVENTE_ADD':
                let datalkdd = draft.blogannonceventes.findIndex(i => i.id === action.payload);
                let datalkddget = draft.blogannonceventes[datalkdd];
                if (datalkdd !== -1) datalkddget.likeked = action.payload;
                if (datalkdd !== -1) datalkddget.countlikes ++;
                return draft;

            case 'LIKE_BLOGANNONCEVENTE_REMOVE':
                let datalkremove = draft.blogannonceventes.findIndex(i => i.id === action.payload);
                let datalkremoveget = draft.blogannonceventes[datalkremove];
                if (datalkremove !== -1) datalkremoveget.likeked = !action.payload;
                if (datalkremove !== -1) datalkremoveget.countlikes --;
                return draft;

            case 'FAVORITE_BLOGANNONCEVENTE_ADD':
                let datadd = draft.blogannonceventes.findIndex(i => i.id === action.payload);
                let dataddget = draft.blogannonceventes[datadd];
                if (datadd !== -1) dataddget.favoriteted = action.payload;
                if (datadd !== -1) dataddget.countfavorites ++;
                return draft;

            case 'FAVORITE_BLOGANNONCEVENTE_REMOVE':
                let dataremove = draft.blogannonceventes.findIndex(i => i.id === action.payload);
                let dataremoveget = draft.blogannonceventes[dataremove];
                if (dataremove !== -1) dataremoveget.favoriteted = !action.payload;
                if (dataremove !== -1) dataremoveget.countfavorites --;
                return draft;

            case 'UNACTIVE_BLOGANNONCEVENTE':
                let dataunactive = draft.blogannonceventes.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.blogannonceventes.splice(dataunactive, 1);
                return draft;

            case 'DELETE_BLOGANNONCEVENTE':
                let datadelete = draft.blogannonceventes.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.blogannonceventes.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

