
import produce from "immer"



const initialState = {
    avisusers: {to:[],from:[],responseavisusers:{user:[]}},
};


export default produce((draft, action = {}) => {
        switch (action.type) {
            case 'GET_AVISUSER_FOR_PUBLIC':
                draft.avisusers = action.payload;
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

