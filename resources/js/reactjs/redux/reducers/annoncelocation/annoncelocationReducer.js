import produce from "immer"

const initialState = {
    annoncelocations: {annoncetype: [], categoryannoncelocation: [], city: [], user: []},
    catgoryannoncelocations: {user: []},
    cityannoncelocations: {user: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYANNONCELOCATIONS':
                draft.catgoryannoncelocations = action.payload;
                return;
            case 'GET_CITYANNONCELOCATIONS':
                draft.cityannoncelocations = action.payload;
                return;
            case 'GET_ANNONCELOCATION_INTERESSE_BY_CITY':
                draft.annoncelocations = action.payload;
                return;
            case 'GET_ANNONCELOCATION_INTERESSE_BY_CATEGORY':
                draft.annoncelocations = action.payload;
                return;
            case 'FAVORITE_ANNONCELOCATION_ADD':
                let datadd = draft.annoncelocations.findIndex(i => i.id === action.payload);
                if (datadd !== -1) draft.annoncelocations[datadd].favoriteted = action.payload;
                return draft;

            case 'FAVORITE_ANNONCELOCATION_REMOVE':
                let dataremove = draft.annoncelocations.findIndex(i => i.id === action.payload);
                if (dataremove !== -1) draft.annoncelocations[dataremove].favoriteted = !action.payload;
                return draft;
        }
    },
    initialState
)

