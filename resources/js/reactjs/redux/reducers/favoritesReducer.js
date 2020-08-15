import produce from "immer"


const initialState = {
    favorites: {

        favoritesforums: {user: [], favoriteable: {user: [], categoryforum: []}},
        favoritesemployments: {favoriteable: {categoryemployment: [], user: [], city: []}}

    },
};


export default produce((draft, action = {}) => {
        switch (action.type) {

            case 'GET_ALL_FAVORITES_BY_USER':
                draft.favorites = action.payload;
                return;

            case 'DELETE_FAVORITES_FORUMS':
                let dataformdelete = draft.favorites.favoritesforums.findIndex(i => i.id === action.payload.id);
                if (dataformdelete !== -1) draft.favorites.favoritesforums.splice(dataformdelete, 1);
                if (dataformdelete !== -1) draft.favorites.favoritesforums_count--;
                return draft;

            case 'DELETE_FAVORITES_EMPLOYMENTS':
                let dataempydelete = draft.favorites.favoritesemployments.findIndex(i => i.id === action.payload.id);
                if (dataempydelete !== -1) draft.favorites.favoritesemployments.splice(dataempydelete, 1);
                if (dataempydelete !== -1) draft.favorites.favoritesemployments_count--;
                return draft;

        }
    },
    initialState
)
