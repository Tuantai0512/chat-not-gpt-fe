// initial states here
export const initalState = {
  token: null,
  data: null,
};

const userReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    case 'REMOVE_TOKEN':
      return {
        ...state,
        token: null
      }
    case 'SAVE_DATA':
      return {
        ...state,
        data: action.payload
      }
    case 'EDIT_NAME':
      return {
        ...state,
        data: action.payload
      }
    case 'EDIT_EMAIL':
      return {
        ...state,
        data: action.payload
      }
    default:
      return state
  }
}

export default userReducer