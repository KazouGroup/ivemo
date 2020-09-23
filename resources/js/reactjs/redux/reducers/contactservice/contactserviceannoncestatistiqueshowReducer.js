import produce from "immer"


const initialState = {
    annonce: {city: [], user: []},
};


export default produce((draft, action = {}) => {
        switch (action.type) {

            case 'GET_RED_CONTACTSERVICEMPLOYMENT':
                draft.annonce = action.payload;
                return;

            case 'GET_RED_CONTACTSERVICEVENTE':
                draft.annonce = action.payload;
                return;

            case 'GET_RED_CONTACTSERVICELOCATION':
                draft.annonce = action.payload;
                return;

            case 'FAVORITE_CONTACTSERVICE_ADD':
                let dataddfav = draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (dataddfav !== -1) draft.annonce.contactservices[dataddfav].status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTSERVICE_REMOVE':
                let datrmfav = draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (datrmfav !== -1) draft.annonce.contactservices[datrmfav].status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_ADD':
                let dataddach = draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (dataddach !== -1) draft.annonce.contactservices[dataddach].status_archvement = action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_REMOVE':
                let dataremoveach = draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (dataremoveach !== -1) draft.annonce.contactservices[dataremoveach].status_archvement = !action.payload;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_ADD':
                let dataactive =  draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.annonce.contactservices[dataactive].status_red = action.payload;
                if (dataactive !== -1) draft.annonce.contactservices_count --;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_REMOVE':
                let dataremoveactive =  draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (dataremoveactive !== -1) draft.annonce.contactservices[dataremoveactive].status_red = !action.payload;
                if (dataremoveactive !== -1) draft.annonce.contactservices_count ++;
                return draft;

            case 'DELETE_CONTACTSERVICE':
                let datadelete =  draft.annonce.contactservices.findIndex(i => i.id === action.payload);
                if (datadelete !== -1)  draft.annonce.contactservices.splice(datadelete, 1);
                return draft;

            case 'ACTIVE_CO_P_ANNONCEVENTE':
                draft.annonce.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCEVENTE':
                draft.annonce.status = !action.payload;
                return draft;

            case 'ACTIVE_CO_P_ANNONCELOCATION':
                draft.annonce.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_P_ANNONCELOCATION':
                draft.annonce.status = !action.payload;
                return draft;

            case 'ACTIVE_ANNONCE_EMPLOYMENT':
                draft.annonce.status = action.payload;
                return draft;

            case 'UNACTIVE_ANNONCE_EMPLOYMENT':
                draft.annonce.status = !action.payload;
                return draft;
        }
    },
    initialState
)
