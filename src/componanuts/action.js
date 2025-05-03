
export const Add = (items) => {
    return {
        type: "ADD_DATA",
        payload: items
    }
}

export const remove = (id) => {
    return {
        type: "REMOVE_DATA",
        payload: { id }
    }
}
export const toggleComplete = (id) => {
    return {
        type: "TOGGLE_COMPLETE",
        payload: { id }
    };
};

// export const updateTodo = (updatedTask) => {
//     return {
//         type: "UPDATE_DATA",
//         payload:  updatedTask
//     };
// };

export const updateTodo = (id, updatedText) => {
    return {
      type: "UPDATE_TODO",
      payload: { id, updatedText }
    };
  };