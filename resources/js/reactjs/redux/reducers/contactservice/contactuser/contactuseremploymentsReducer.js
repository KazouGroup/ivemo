import produce from "immer"


const initialState = {
    contactservices: {contactservicesemployments: {to:[],from:[],contactserviceable:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_ALL_CONTACTSERVICE_EMPLOYMENT':
                draft.contactservices = action.payload;
                return;

            case 'FAVORITE_CONTACTSERVICE_EMPLOYMENT_ADD':
                draft.contactservices.contactservicesemployments[
                    draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload)
                    ].status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTSERVICE_EMPLOYMENT_REMOVE':
                draft.contactservices.contactservicesemployments[
                    draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload)
                    ].status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_EMPLOYMENT_ADD':
                let datadd = draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                draft.contactservices.contactservicesemployments[datadd].status_archvement = action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTSERVICE_EMPLOYMENT_REMOVE':
                let dataremove = draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                draft.contactservices.contactservicesemployments[dataremove].status_archvement = !action.payload;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_EMPLOYMENT_ADD':
                let dataactive =  draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.contactservices.contactservicesemployments[dataactive].status_red = action.payload;
                if (dataactive !== -1) draft.contactservices.contactservicesemployments_count --;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_EMPLOYMENT_REMOVE':
                let dataremoveactive =  draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                if (dataremoveactive !== -1) draft.contactservices.contactservicesemployments[dataremoveactive].status_red = !action.payload;
                if (dataremoveactive !== -1) draft.contactservices.contactservicesemployments_count ++;
                return draft;

            case 'DELETE_CONTACTSERVICE_EMPLOYMENT':
                let datadelete =  draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                if (datadelete !== -1)  draft.contactservices.contactservicesemployments.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)
