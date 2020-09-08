import produce from "immer"


const initialState = {
    item: {contactserviceable: {categoryannoncelocation: [],annoncetype:[],uploadimages:[], user: {profile: []}, city: []}, from: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_RED_CONTACTSERVICANONCELOCATION_SHOW':
                draft.item = action.payload;
                return;

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

            case 'ACTIVE_CO_ANNONCELOCATION':
                draft.item.contactserviceable.status = action.payload;
                return draft;

            case 'UNACTIVE_CO_ANNONCELOCATION':
                draft.item.contactserviceable.status = !action.payload;
                return draft;
        }
    },
    initialState
)
