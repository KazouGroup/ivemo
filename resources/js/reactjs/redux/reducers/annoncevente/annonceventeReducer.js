import produce from "immer"


const initialState = {
    catgoryannonceventes: {user: []},
    cityannonceventes: {user: []},
    annonceventes: {annoncetype:[],categoryannoncevente:[],user:{profile:[]},imagereservations:[]},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYANNONCEVENTES':
                draft.catgoryannonceventes = action.payload;
                return;
            case 'GET_CITYANNONCEVENTES':
                draft.cityannonceventes = action.payload;
                return;
            case 'GET_CATEGORYANNONCEVENTES_BY_CITY':
                draft.catgoryannonceventes = action.payload;
                return;

            case 'GET_ANNONCEVENTE_INTERESSE_BY_CITY':
                draft.annonceventes = action.payload;
                return;

            case 'GET_ALL_ANNONCEVENTES':
                draft.annonceventes = action.payload;
                return;

            case 'GET_ANNONCEVENTE_BY_USER_PUBLIC':
                draft.annonceventes = action.payload;
                return;

            case 'GET_ANNONCEVENTE_INTERESSE_BY_CATEGORY':
                draft.annonceventes = action.payload;
                return;

            case 'FAVORITE_ANNONCEVENTE_ADD':
                let datadd = draft.annonceventes.findIndex(i => i.id === action.payload);
                if (datadd !== -1) draft.annonceventes[datadd].favoriteted = action.payload;
                return draft;

            case 'FAVORITE_ANNONCEVENTE_REMOVE':
                let dataremove = draft.annonceventes.findIndex(i => i.id === action.payload);
                if (dataremove !== -1) draft.annonceventes[dataremove].favoriteted = !action.payload;
                return draft;

            case 'UNACTIVE_ANNONCEVENTE':
                let dataunactive = draft.annonceventes.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.annonceventes.splice(dataunactive, 1);
                return draft;

            case 'DELETE_ANNONCEVENTE':
                let datadelete = draft.annonceventes.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.annonceventes.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

