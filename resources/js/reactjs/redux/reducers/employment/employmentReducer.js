
import produce from "immer"



const initialState = {
    items:{categoryemployment:[],user:{profile:[]},city:[]},
    catgoryitems: {user: []},
    cityemployments : {user:[]},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_CATEGORYEMPLOYMENTS':
                draft.catgoryitems = action.payload;
                return;

            case 'GET_CITYEMPLOYMENTS':
                draft.cityemployments = action.payload;
                return;

            case 'GET_CATEGORYEMPLOYMENTS_BY_CATEGORY':
                draft.catgoryitems = action.payload;
                return;

            case 'GET_CATEGORYEMPLOYMENTS_BY_USER':
                draft.catgoryitems = action.payload;
                return;

            case 'GET_EMPLOYEMENT_BY_USER_PUBLIC':
                draft.items = action.payload;
                return;

            case 'GET_ALL_EMPLOYMENTS_FOR_CONTACTSERVICE':
                draft.items = action.payload;
                return;

            case 'GET_EMPLOYEMENT_INTERESSE':
                draft.items = action.payload;
                return;

            case 'UNACTIVE_PRIVATE_EMPLOYEMENT':
                let dataprivateunactive = draft.items.findIndex(i => i.id === action.payload);
                if (dataprivateunactive !== -1) draft.items[dataprivateunactive].status = !action.payload;
                return draft;

            case 'ACTIVE_EMPLOYEMENT':
                let dataactive = draft.items.findIndex(i => i.id === action.payload);
                if (dataactive !== -1) draft.items[dataactive].status = action.payload;
                return draft;

            case 'UNACTIVE_EMPLOYEMENT':
                let dataunactive = draft.items.findIndex(i => i.id === action.payload);
                if (dataunactive !== -1) draft.items.splice(dataunactive, 1);
                return draft;

            case 'FAVORITE_EMPLOYEMENT_ADD':
               let datadd = draft.items.findIndex(i => i.id === action.payload);
                if (datadd !== -1) draft.items[datadd].favoriteted = action.payload;
                return draft;

            case 'FAVORITE_EMPLOYEMENT_REMOVE':
                let dataremove = draft.items.findIndex(i => i.id === action.payload);
                if (dataremove !== -1) draft.items[dataremove].favoriteted = !action.payload;
                return draft;

            case 'DELETE_EMPLOYEMENT':
                let datadelete = draft.items.findIndex(i => i.id === action.payload);
                if (datadelete !== -1) draft.items.splice(datadelete, 1);
                return draft;
        }
    },
    initialState
)

