import produce from "immer"

const initialState = {
    annoncelocations: {uploadimages:[],annoncetype: [],periodeannonce:[], categoryannoncelocation: [], city: [], user: []},
    catgoryannoncelocations: {user: []},
    cityannoncelocations: {user: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYANNONCELOCATIONS':
                draft.catgoryannoncelocations = action.payload;
                return;

            case 'GET_CATEGORYANNONCELOCATIONS_BY_USER':
                draft.catgoryannoncelocations = action.payload;
                return;

            case 'GET_CITYANNONCELOCATIONS':
                draft.cityannoncelocations = action.payload;
                return;

            case 'GET_ANNONCELOCATION_INTERESSE_BY_USER':
                draft.annoncelocations = action.payload;
                return;

            case 'GET_ANNONCELOCATION_INTERESSE_BY_CATEGORY':
                draft.annoncelocations = action.payload;
                return;

            case 'GET_ANNONCELOCATION_BY_USER_PRIVATE':
                draft.annoncelocations = action.payload;
                return;

            case 'GET_ANNONCELOCATION_BY_USER_PUBLIC':
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

            case 'UNACTIVE_ANNONCELOCATION':
                let dataunactive = draft.annoncelocations.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.annoncelocations.splice(dataunactive, 1);
                return draft;

            case 'ACTIVE_CO_ANNONCELOCATION':
                let datacounactive = draft.annoncelocations.findIndex(i => i.id === action.payload);
                if (datacounactive !== -1) draft.annoncelocations[datacounactive].status = action.payload;
                return draft;

            case 'UNACTIVE_CO_ANNONCELOCATION':
                let datacoactive = draft.annoncelocations.findIndex(i => i.id === action.payload);
                if (datacoactive !== -1) draft.annoncelocations[datacoactive].status = !action.payload;
                return draft;

            case 'DELETE_ANNONCELOCATION':
                let datadelete = draft.annoncelocations.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.annoncelocations.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

