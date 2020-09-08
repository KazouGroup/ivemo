import produce from "immer"


const initialState = {
    item: {contactserviceable: {categoryemployment: [], user: {profile: []}, city: []}, from: []}
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_RED_CONTACTSERVICEMPLOYMENT_SHOW':
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
