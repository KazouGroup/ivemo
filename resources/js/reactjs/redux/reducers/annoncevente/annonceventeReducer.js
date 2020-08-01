import produce from "immer"


const initialState = {
    catgoryannonceventes: {user: []},
    cityannonceventes: {user: []}
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
        }
    },
    initialState
)

