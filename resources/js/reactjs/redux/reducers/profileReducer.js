
import produce from "immer"



const initialState = {
    profiluser: {profile:[]},
    avisusers: {to:[],from:[],responseavisusers:{user:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_PROFILE_USER_FOR_PUBLIC':
                draft.profiluser = action.payload;
                return;

            case 'GET_AVISUSER_FOR_PUBLIC':
                draft.avisusers = action.payload;
                return;

            case 'FOLLOWERUSER_ADD':
                draft.profiluser.followeruser = action.payload;
                draft.profiluser.countfollowerusers ++;
                return;

            case 'FOLLOWERUSER_REMOVE':
                draft.profiluser.followeruser = !action.payload;
                draft.profiluser.countfollowerusers --;
                return;

            case 'SUBSCRIBE_USER_FOR_ANNONCELOCATION_ADD':
                draft.profiluser.subscribedannonce = action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_ANNONCELOCATION_REMOVE':
                draft.profiluser.subscribedannonce = !action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_EMPLOYEMENT_ADD':
                draft.profiluser.subscribedemployment = action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_EMPLOYEMENT_REMOVE':
                draft.profiluser.subscribedemployment = !action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_FORUM_ADD':
                draft.profiluser.subscribedforum = action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_FORUM_REMOVE':
                draft.profiluser.subscribedforum = !action.payload;
                return;

            case 'UNACTIVE_AVISUSER':
                let dataunac = draft.avisusers.findIndex(i => i.id === action.payload);
                if (dataunac !== -1) draft.avisusers.splice(dataunac, 1);
                return draft;

            case 'DELETE_AVISUSER':
                let datadelete = draft.avisusers.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.avisusers.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

