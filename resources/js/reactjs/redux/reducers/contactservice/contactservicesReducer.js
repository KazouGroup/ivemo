import produce from "immer"


const initialState = {
    contactservices: {
        contactusers: [],
        notifications: [],
        contactservicesemployments: {to: [], from: [], contactserviceable: []}
    },
};


export default produce((draft, action = {}) => {
        switch (action.type) {

            case 'GET_ALL_CONTACTSERVICE':
                draft.contactservices = action.payload;
                return;

            /* ********Init contactservice employment****** */

            case 'ACTIVE_NOTIFICATION_RED':
                let datauntactive = draft.contactservices.notifications.findIndex(i => i.id === action.payload);
                if (datauntactive !== -1) draft.contactservices.notifications[datauntactive].read_at = action.payload;
                if (datauntactive !== -1) draft.contactservices.unread_notifications_count--;
                return draft;

            /* *********End****** */

            /* ********Init contactservice employment****** */

            case 'GET_RED_CONTACTUSER_SHOW':
                draft.contactuser = action.payload;
                return;

            case 'FAVORITE_CONTACTUSER_ADD':
                draft.contactservices.contactusers[
                    draft.contactservices.contactusers.findIndex(i => i.id === action.payload)
                    ].status_favorite = action.payload;
                return draft;

            case 'FAVORITE_CONTACTUSER_REMOVE':
                draft.contactservices.contactusers[
                    draft.contactservices.contactusers.findIndex(i => i.id === action.payload)
                    ].status_favorite = !action.payload;
                return draft;

            case 'ARCHVEMENT_CONTACTUSER_ADD':
                let datausdd = draft.contactservices.contactusers.findIndex(i => i.id === action.payload);
                if (datausdd !== -1) draft.contactservices.contactusers[datausdd].status_archvement = action.payload;
                if (datausdd !== -1) draft.contactservices.archvementcontactusers_count++;
                return draft;

            case 'ARCHVEMENT_CONTACTUSER_REMOVE':
                let datausremove = draft.contactservices.contactusers.findIndex(i => i.id === action.payload);
                if (datausremove !== -1) draft.contactservices.contactusers[datausremove].status_archvement = !action.payload;
                if (datausremove !== -1) draft.contactservices.archvementcontactusers_count--;
                return draft;

            case 'ACTIVE_CONTACTUSER_ADD':
                let datausactive = draft.contactservices.contactusers.findIndex(i => i.id === action.payload);
                if (datausactive !== -1) draft.contactservices.contactusers[datausactive].status_red = action.payload;
                if (datausactive !== -1) draft.contactservices.contactusers_count++;
                return draft;

            case 'ACTIVE_CONTACTUSER_REMOVE':
                let datausremoveactive = draft.contactservices.contactusers.findIndex(i => i.id === action.payload);
                if (datausremoveactive !== -1) draft.contactservices.contactusers[datausremoveactive].status_red = !action.payload;
                if (datausremoveactive !== -1) draft.contactservices.contactusers_count--;
                return draft;

            case 'DELETE_CONTACTUSER':
                let datausdelete = draft.contactservices.contactusers.findIndex(i => i.id === action.payload);
                if (datausdelete !== -1) draft.contactservices.contactusers.splice(datausdelete, 1);
                if (datausdelete !== -1) draft.contactservices.contactusers_count--;
                return draft;

            /* *********End****** */

            /* ********Init contactservice employment****** */

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
                let dataactive = draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.contactservices.contactservicesemployments[dataactive].status_red = action.payload;
                if (dataactive !== -1) draft.contactservices.contactservicesemployments_count--;
                return draft;

            case 'ACTIVE_CONTACTSERVICE_EMPLOYMENT_REMOVE':
                let dataremoveactive = draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                if (dataremoveactive !== -1) draft.contactservices.contactservicesemployments[dataremoveactive].status_red = !action.payload;
                if (dataremoveactive !== -1) draft.contactservices.contactservicesemployments_count++;
                return draft;

            case 'DELETE_CONTACTSERVICE_EMPLOYMENT':
                let datadelete = draft.contactservices.contactservicesemployments.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.contactservices.contactservicesemployments.splice(datadelete, 1);
                if (datadelete !== -1) draft.contactservices.contactservicesemployments_count--;
                return draft;

            /* *********End****** */
        }
    },
    initialState
)
