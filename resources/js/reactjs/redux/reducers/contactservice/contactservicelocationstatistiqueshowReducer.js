import produce from "immer"


const initialState = {
    annoncelocation: {uploadimages:[],annoncetype: [], categoryannoncelocation: [], city: [], user: []},
    contactservices: {contactservicesannoncelocations: {to:[],from:[],contactserviceable:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {

            case 'GET_RED_CONTACTSERVICELOCATION':
                draft.annoncelocation = action.payload;
                return;

            case 'FAVORITE_CONTACTSERVICE_ADD':
                let dataddfav = draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (dataddfav !== -1) draft.annoncelocation.contactservices[dataddfav].status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTSERVICE_REMOVE':
                let datrmfav = draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (datrmfav !== -1) draft.annoncelocation.contactservices[datrmfav].status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_ADD':
                let dataddach = draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (dataddach !== -1) draft.annoncelocation.contactservices[dataddach].status_archvement = action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_REMOVE':
                let dataremoveach = draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (dataremoveach !== -1) draft.annoncelocation.contactservices[dataremoveach].status_archvement = !action.payload;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_ADD':
                let dataactive =  draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.annoncelocation.contactservices[dataactive].status_red = action.payload;
                if (dataactive !== -1) draft.annoncelocation.contactservices_count --;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_REMOVE':
                let dataremoveactive =  draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (dataremoveactive !== -1) draft.annoncelocation.contactservices[dataremoveactive].status_red = !action.payload;
                if (dataremoveactive !== -1) draft.annoncelocation.contactservices_count ++;
                return draft;

            case 'DELETE_CONTACTSERVICE':
                let datadelete =  draft.annoncelocation.contactservices.findIndex(i => i.id === action.payload);
                if (datadelete !== -1)  draft.annoncelocation.contactservices.splice(datadelete, 1);
                return draft;

            case 'ACTIVE_CO_ANNONCELOCATION':
                draft.annoncelocation.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_ANNONCELOCATION':
                draft.annoncelocation.status = !action.payload;
                return draft;
        }
    },
    initialState
)
