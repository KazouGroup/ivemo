import produce from "immer"

const initialState = {
    annoncereservations: {annoncetype: [], categoryannoncereservation: [], city: [], user: []},
    catgoryannoncereservations: {user: []},
    cityannoncereservations: {user: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYANNONCERESERVATIONS':
                draft.catgoryannoncereservations = action.payload;
                return;

            case 'GET_CITYANNONCERESERVATIONS':
                draft.cityannoncereservations = action.payload;
                return;

            case 'GET_ANNONCERESERVATION_INTERESSE_BY_CITY':
                draft.annoncereservations = action.payload;
                return;

            case 'GET_ANNONCERESERVATION_INTERESSE_BY_USER':
                draft.annoncereservations = action.payload;
                return;

            case 'FAVORITE_ANNONCERESERVATION_ADD':
                let datadd = draft.annoncereservations.findIndex(i => i.id === action.payload);
                if (datadd !== -1) draft.annoncereservations[datadd].favoriteted = action.payload;
                return draft;

            case 'FAVORITE_ANNONCERESERVATION_REMOVE':
                let dataremove = draft.annoncereservations.findIndex(i => i.id === action.payload);
                if (dataremove !== -1) draft.annoncereservations[dataremove].favoriteted = !action.payload;
                return draft;

            case 'UNACTIVE_ANNONCERESERVATION':
                let dataunactive = draft.annoncereservations.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.annoncereservations.splice(dataunactive, 1);
                return draft;
        }
    },
    initialState
)

