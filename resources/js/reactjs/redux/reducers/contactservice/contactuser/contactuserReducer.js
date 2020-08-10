import produce from "immer"


const initialState = {
    contactusers: {contactusers:[]},
    contactuser: [],
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_ALL_CONTACTUSERS':
                draft.contactusers = action.payload;
                return;

            case 'GET_RED_CONTACTUSER_SHOW':
                draft.contactuser = action.payload;
                return;

            case 'FAVORITE_CONTACTUSER_ADD':
                draft.contactusers.contactusers[
                    draft.contactusers.contactusers.findIndex(i => i.id === action.payload)
                    ].status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTUSER_REMOVE':
                draft.contactusers.contactusers[
                    draft.contactusers.contactusers.findIndex(i => i.id === action.payload)
                    ].status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTUSER_ADD':
                let datadd = draft.contactusers.contactusers.findIndex(i => i.id === action.payload);
                if (datadd !== -1) draft.contactusers.contactusers[datadd].status_archvement = action.payload;
                if (datadd !== -1) draft.contactusers.archvementcontactusers_count ++;
                return draft;

            case 'ARCHVEMENT_CONTACTUSER_REMOVE':
                let dataremove = draft.contactusers.contactusers.findIndex(i => i.id === action.payload);
                if (dataremove !== -1) draft.contactusers.contactusers[dataremove].status_archvement = !action.payload;
                if (dataremove !== -1) draft.contactusers.archvementcontactusers_count --;
                return draft;

            case 'ACTIVE_CONTACTUSER_ADD':
                let dataactive =  draft.contactusers.contactusers.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.contactusers.contactusers[dataactive].status_red = action.payload;
                if (dataactive !== -1) draft.contactusers.contactusers_count ++;
                return draft;

            case 'ACTIVE_CONTACTUSER_REMOVE':
                let dataremoveactive =  draft.contactusers.contactusers.findIndex(i => i.id === action.payload);
                if (dataremoveactive !== -1) draft.contactusers.contactusers[dataremoveactive].status_red = !action.payload;
                if (dataremoveactive !== -1) draft.contactusers.contactusers_count --;
                return draft;

            case 'DELETE_CONTACTUSER':
                let datadelete =  draft.contactusers.contactusers.findIndex(i => i.id === action.payload);
                if (datadelete !== -1)  draft.contactusers.contactusers.splice(datadelete, 1);
                return draft;

        }
    },
    initialState
)
