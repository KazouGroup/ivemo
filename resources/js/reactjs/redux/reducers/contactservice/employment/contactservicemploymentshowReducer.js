import produce from "immer"


const initialState = {
    employment: {categoryemployment: [], user: {profile: []}, city: [], contactservices: []},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_RED_CONTACTSERVICEMPLOYMENT':
                draft.employment = action.payload;
                return;
            case 'FAVORITE_CONTACTSERVICE_ADD':
                draft.employment.contactservices[
                    draft.employment.contactservices.findIndex(i => i.id === action.payload)
                    ].status_favorite = action.payload;
                return draft;
            case 'FAVORITE_CONTACTSERVICE_REMOVE':
                draft.employment.contactservices[
                    draft.employment.contactservices.findIndex(i => i.id === action.payload)
                    ].status_favorite = !action.payload;
                return draft;
            case 'ARCHVEMENT_CONTACTSERVICE_ADD':
                let datadd = draft.employment.contactservices.findIndex(i => i.id === action.payload);
                draft.employment.contactservices[datadd].status_archvement = action.payload;
                return draft;
            case 'ARCHVEMENT_CONTACTSERVICE_REMOVE':
                let dataremove = draft.employment.contactservices.findIndex(i => i.id === action.payload);
                draft.employment.contactservices[dataremove].status_archvement = !action.payload;
                return draft;
            case 'ACTIVE_CONTACTSERVICE_ADD':
                draft.employment.contactservices[
                    draft.employment.contactservices.findIndex(i => i.id === action.payload)
                    ].status_red = action.payload;
                return draft;
            case 'ACTIVE_CONTACTSERVICE_REMOVE':
                draft.employment.contactservices[
                    draft.employment.contactservices.findIndex(i => i.id === action.payload)
                    ].status_red = !action.payload;
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
