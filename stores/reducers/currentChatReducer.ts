export const initalState = {
    conversation: null
};

const currentChatReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case 'SAVE_CONVERSATION':
            return {
                ...state,
                conversation: action.payload
            }
        default:
            return state
    }
}

export default currentChatReducer