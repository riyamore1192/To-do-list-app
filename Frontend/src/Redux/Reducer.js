
const intial_state = {
    user_data: [],

}

const todoreducers = (state = intial_state, action) => {
    // console.log('first', action.payload)
    switch (action.type) {
        // case "ADD_DATA":
        //     return {
        //         ...state,
        //         user_data: [...state.user_data, { task: action.payload }]
        //     };
        case "ADD_DATA":
            return {
                ...state,
                user_data: [...state.user_data, action.payload]  // directly use the backend's format
            };

        case "REMOVE_DATA":
            // console.log("Removing item with id:", action.payload.id); 
            const dltdata = state.user_data.filter((ele, k) => k !== action.payload.id)
            return {
                ...state,
                user_data: dltdata
            };

        case "TOGGLE_COMPLETE":
            return {
                user_data: state.user_data.map((ele, index) =>
                    index === action.payload.id ? { ...ele, completed: !ele.completed } : ele
                )
            };


        case 'UPDATE_TODO':
            return {
                ...state,
                user_data: state.user_data.map((item, index) =>
                    index === action.payload.id
                        ? { ...item, task: action.payload.updatedText }
                        : item
                )
            };
        case 'LOGOUT' : 
            return intial_state;
        default:
            return state;
    }
}

export default todoreducers;