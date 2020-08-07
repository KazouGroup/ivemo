
import produce from "immer"



const initialState = {
    userfollowers: {user:[],member:[]},
    profiluser: {profile:[]},
    avisusers: {to:[],from:[],responseavisusers:{user:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_FOLLOWERSUSERS':
                draft.userfollowers = action.payload;
                return;

            case 'GET_FOLLOWINGSUSERS':
                draft.userfollowers = action.payload;
                return;

            case 'GET_PROFILE_USER_FOR_PUBLIC':
                draft.profiluser = action.payload;
                return;

            case 'GET_AVISUSER_FOR_PUBLIC':
                draft.avisusers = action.payload;
                return;

            case 'FOLLOWERUSER_FOR_FOLLOWERS_ADD':
                let dataflwrgdd = draft.userfollowers.findIndex(i => i.user_id === action.payload);
                let dataflwrgddget = draft.userfollowers[dataflwrgdd];
                if (dataflwrgdd !== -1) dataflwrgddget.followeruser = action.payload;
                if (dataflwrgdd !== -1) dataflwrgddget.countfollowerusers ++;
                return draft;

            case 'FOLLOWERUSER_FOR_FOLLOWERS_REMOVE':
                let dataflwrgremove = draft.userfollowers.findIndex(i => i.user_id === action.payload);
                let dataflwrgremoveget = draft.userfollowers[dataflwrgremove];
                if (dataflwrgremove !== -1) dataflwrgremoveget.followeruser = !action.payload;
                if (dataflwrgremove !== -1) dataflwrgremoveget.countfollowerusers --;
                return draft;

            case 'FOLLOWERUSER_FOR_FOLLOWING_ADD':
                let dataflingdd = draft.userfollowers.findIndex(i => i.member_id === action.payload);
                let dataflingddget = draft.userfollowers[dataflingdd];
                if (dataflingdd !== -1) dataflingddget.followinguser = action.payload;
                if (dataflingdd !== -1) dataflingddget.countfollowinguser_followingusers ++;
                return draft;

            case 'FOLLOWERUSER_FOR_FOLLOWING_REMOVE':
                let dataflingremove = draft.userfollowers.findIndex(i => i.member_id === action.payload);
                let dataflingremoveget = draft.userfollowers[dataflingremove];
                if (dataflingremove !== -1) dataflingremoveget.followinguser = !action.payload;
                if (dataflingremove !== -1) dataflingremoveget.countfollowinguser_followingusers --;
                return draft;

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

            case 'SUBSCRIBE_USER_FOR_ANNONCERESERVATION_ADD':
                draft.profiluser.subscribedannonce = action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_ANNONCERESERVATION_REMOVE':
                draft.profiluser.subscribedannonce = !action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_ANNONCEVENTE_ADD':
                draft.profiluser.subscribedannonce = action.payload;
                return;

            case 'SUBSCRIBE_USER_FOR_ANNONCEVENTE_REMOVE':
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

