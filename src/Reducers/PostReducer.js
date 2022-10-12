
export const intialStatePost = [];

export const PostReducer = (state, action) => {
    switch (action.type) {

        case 'GET_ALL_POSTS':
            return action.payload;

        case 'ADD_POST':
            return action.payload;

            case 'DELETE_POST':
                return state.filter(post => post._id !== action.payload);
        default:
            return state;

            
    }
};
