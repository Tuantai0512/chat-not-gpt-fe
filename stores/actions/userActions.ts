export const addToken = (token: string | null) => {
    return {
      type: 'ADD_TOKEN',
      payload: token
    }
}

export const removeToken = () => {
  return {
    type: 'REMOVE_TOKEN'
  }
}

export const saveData = (data: any) => {
  return {
    type: 'SAVE_DATA',
    payload: data
  }
}

export const editNameRedux = (firstName: string, lastName: string) => {
  return {
    type: 'EDIT_NAME',
    payload: {firstName, lastName}
  }
}

export const editEmailRedux = (email: string) => {
  return {
    type: 'EDIT_EMAIL',
    payload: {email}
  }
}