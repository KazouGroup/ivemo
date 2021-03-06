import produce from "immer"


const initialState = {
    item: {contactserviceable: {}, from: []},
    itemreservation: {annoncetype: [], categoryannoncereservation: [], city: [], user: [],contactservices:{}},
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

            case 'ACTIVE_COMMENT_CONTACTSERVICE_ADD':
                let dataactivecca = draft.itemreservation.contactservices.findIndex(i => i.id === action.payload);
                if (dataactivecca !== -1) draft.itemreservation.contactservices[dataactivecca].status_red = action.payload;
                if (dataactivecca !== -1) draft.itemreservation.contactservices_count--;
                return draft;

                //Reservation

            case 'GET_RED_CONTACTSERVICANONCERESERVATION_SHOW':
                draft.itemreservation = action.payload;
                return;

            case 'ACTIVE_CO_P_ANNONCERESERVATION':
                draft.itemreservation.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCERESERVATION':
                draft.itemreservation.status = !action.payload;
                return draft;

                //Location

            case 'GET_RED_CONTACTSERVICANONCELOCATION_SHOW':
                draft.item = action.payload;
                return;

            case 'ACTIVE_CO_P_ANNONCELOCATION':
                draft.item.contactserviceable.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCELOCATION':
                draft.item.contactserviceable.status = !action.payload;
                return draft;

                //Ventes

            case 'GET_RED_CONTACTSERVICANONCEVENTE_SHOW':
                draft.item = action.payload;
                return;

            case 'ACTIVE_CO_P_ANNONCEVENTE':
                draft.item.contactserviceable.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCEVENTE':
                draft.item.contactserviceable.status = !action.payload;
                return draft;

                //Employment

            case 'GET_RED_CONTACTSERVICEMPLOYMENT_SHOW':
                draft.item = action.payload;
                return;

            case 'ACTIVE_ANNONCE_EMPLOYMENT':
                draft.item.contactserviceable.status = action.payload;
                return draft;

            case 'UNACTIVE_ANNONCE_EMPLOYMENT':
                draft.item.contactserviceable.status = !action.payload;
                return draft;
        }
    },
    initialState
)
