import produce from "immer"


const initialState = {
    employment: {categoryemployment: [], user: {profile: []}, city: [], contactservices: []},
    contactservices: {contactservicesemployments: {to:[],from:[],contactserviceable:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {

            case 'GET_RED_CONTACTSERVICEMPLOYMENT':
                draft.employment = action.payload;
                return;

            case 'FAVORITE_CONTACTSERVICE_ADD':
                let dataddfav = draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (dataddfav !== -1) draft.employment.contactservices[dataddfav].status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTSERVICE_REMOVE':
                let datrmfav = draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (datrmfav !== -1) draft.employment.contactservices[datrmfav].status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_ADD':
                let dataddach = draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (dataddach !== -1) draft.employment.contactservices[dataddach].status_archvement = action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_REMOVE':
                let dataremoveach = draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (dataremoveach !== -1) draft.employment.contactservices[dataremoveach].status_archvement = !action.payload;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_ADD':
                let dataactive =  draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.employment.contactservices[dataactive].status_red = action.payload;
                if (dataactive !== -1) draft.employment.contactservices_count --;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_REMOVE':
                let dataremoveactive =  draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (dataremoveactive !== -1) draft.employment.contactservices[dataremoveactive].status_red = !action.payload;
                if (dataremoveactive !== -1) draft.employment.contactservices_count ++;
                return draft;

            case 'DELETE_CONTACTSERVICE':
                let datadelete =  draft.employment.contactservices.findIndex(i => i.id === action.payload);
                if (datadelete !== -1)  draft.employment.contactservices.splice(datadelete, 1);
                return draft;

            case 'ACTIVE_ANNONCE_EMPLOYMENT':
                draft.employment.status = action.payload;
                return draft;

            case 'UNACTIVE_ANNONCE_EMPLOYMENT':
                draft.employment.status = !action.payload;
                return draft;
        }
    },
    initialState
)
