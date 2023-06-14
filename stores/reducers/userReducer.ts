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
    default:
      return state
  }
}

export default userReducer