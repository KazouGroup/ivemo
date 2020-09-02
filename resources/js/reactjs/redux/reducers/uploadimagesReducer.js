import produce from "immer"


const initialState = {
    uploadimages: {},
};


export default produce((draft, action = {}) => {
    switch (action.type) {
        case 'GET_UPLOADIMAGES_ACTIVITYCITIES':
            draft.uploadimages = action.payload;
            return;

    }
},
    initialState
)
