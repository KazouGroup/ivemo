
import produce from "immer"

const initialState = {
    city: {},
    activitycities: {user:[],uploadimages:[],city:[]},
    activitycity: {user:[],uploadimages:[],city:[]},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_ACTIVITYCITIES_SHOW':
                draft.activitycity = action.payload;
                return;

            case 'FAVORITE_ACTIVITYCITIES_SHOW_ADD':
                draft.activitycity.favoriteted = action.payload;
                draft.activitycity.countfavorites ++;
                return draft;

            case 'FAVORITE_ACTIVITYCITIES_SHOW_REMOVE':
                draft.activitycity.favoriteted = !action.payload;
                draft.activitycity.countfavorites --;
                return draft;

            case 'LIKE_ACTIVITYCITIES_SHOW_ADD':
                draft.activitycity.likeked = action.payload;
                draft.activitycity.countlikes ++;
                return draft;

            case 'LIKE_ACTIVITYCITIES_SHOW_REMOVE':
                draft.activitycity.likeked = !action.payload;
                draft.activitycity.countlikes --;
                return draft;

                /* ***************************************** */

            case 'GET_ACTIVITYCITIES_INTERESSE':
                draft.activitycities = action.payload;
                return;

            case 'LIKE_ACTIVITYCITIES_ADD':
                let datalkdd = draft.activitycities.findIndex(i => i.id === action.payload);
                let datalkddget = draft.activitycities[datalkdd];
                if (datalkdd !== -1) datalkddget.likeked = action.payload;
                if (datalkdd !== -1) datalkddget.countlikes ++;
                return draft;

            case 'LIKE_ACTIVITYCITIES_REMOVE':
                let datalkremove = draft.activitycities.findIndex(i => i.id === action.payload);
                let datalkremoveget = draft.activitycities[datalkremove];
                if (datalkremove !== -1) datalkremoveget.likeked = !action.payload;
                if (datalkremove !== -1) datalkremoveget.countlikes --;
                return draft;

            case 'FAVORITE_ACTIVITYCITIES_ADD':
                let datadd = draft.activitycities.findIndex(i => i.id === action.payload);
                let dataddget = draft.activitycities[datadd];
                if (datadd !== -1) dataddget.favoriteted = action.payload;
                if (datadd !== -1) dataddget.countfavorites ++;
                return draft;

            case 'FAVORITE_ACTIVITYCITIES_REMOVE':
                let dataremove = draft.activitycities.findIndex(i => i.id === action.payload);
                let dataremoveget = draft.activitycities[dataremove];
                if (dataremove !== -1) dataremoveget.favoriteted = !action.payload;
                if (dataremove !== -1) dataremoveget.countfavorites --;
                return draft;

                /* ******************************************************************** */

            case 'GET_CITY_SHOW':
                draft.city = action.payload;
                return;

            case 'LIKE_CITY_ADD':
                draft.city.likeked = action.payload;
                draft.city.countlikes ++;
                return draft;

            case 'LIKE_CITY_REMOVE':
                draft.city.likeked = !action.payload;
                draft.city.countlikes --;
                return draft;
        }
    },
    initialState
)

