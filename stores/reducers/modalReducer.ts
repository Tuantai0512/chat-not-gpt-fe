export const initalState = {
    isOpen: false
};

const modalReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                ...state,
                isOpen: true
            }
        case 'CLOSE_MODAL':
            return {
                ...state,
                isOpen: false
            }
        default:
            return state
    }
}

export default modalReducer