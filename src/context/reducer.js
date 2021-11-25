export const ACTION = {
    ADD_PAYLOAD: "ADD_PAYLOAD"
}

export function reducer(state, action) {
    switch (action.type) {
        case ACTION.ADD_PAYLOAD:
            return action.payload;
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}