export const userLoginSuccess = (userInfo: any) => {
    return {
      type: 'USER_LOGIN_SUCCESS',
      payload: userInfo
    }
}