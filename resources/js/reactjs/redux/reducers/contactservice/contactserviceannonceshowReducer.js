import produce from "immer"


const initialState = {
    item: {contactserviceable: {}, from: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {

            case 'FAVORITE_CONTACTSERVICE_ADD':
                draft.item.status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTSERVICE_REMOVE':
                draft.item.status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_ADD':
                draft.item.status_archvement = action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_REMOVE':
                draft.item.status_archvement = !action.payload;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_ADD':
                draft.item.status_red = action.payload;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_REMOVE':
                draft.item.status_red = !action.payload;
                return draft;

            case 'GET_RED_CONTACTSERVICANONCELOCATION_SHOW':
                draft.item = action.payload;
                return;

            case 'ACTIVE_CO_P_ANNONCELOCATION':
                draft.item.contactserviceable.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCELOCATION':
                draft.item.contactserviceable.status = !action.payload;
                return draft;

            case 'GET_RED_CONTACTSERVICANONCEVENTE_SHOW':
                draft.item = action.payload;
                return;

            case 'ACTIVE_CO_P_ANNONCEVENTE':
                draft.item.contactserviceable.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCEVENTE':
                draft.item.contactserviceable.status = !action.payload;
                return draft;
        }
    },
    initialState
)
