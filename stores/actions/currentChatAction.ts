export const saveCurrentChat = (conversation: any) => {
    return {
        type: 'SAVE_CONVERSATION',
        payload: conversation
    }
}