// initial states here
export const initalState = {
    isLoggedin: false,
    userInfo: {}
};

const userReducer = (state = initalState, action: any) => {
    switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
        return{
            ...state,
            isLoggedIn: true,
            userInfo: action.payload
        }
      default:
        return state
    }
  }
  
  export default userReducer