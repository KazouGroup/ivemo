import produce from "immer"

const initialState = {
    catgoryannoncelocations: {user: []},
    cityannoncelocations: {user: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYANNONCELOCATIONS':
                draft.catgoryannoncelocations = action.payload;
                return;
        }
        switch (action.type) {
            case 'GET_CITYANNONCELOCATIONS':
                draft.cityannoncelocations = action.payload;
                return;
        }
    },
    initialState
)

