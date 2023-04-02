const gameSettings = (state = {}, action) => {
    switch (action.type) {
      case 'ADD_SETTINGS': return {...state, ...action.payload}
      default:
        return state
    }
  }
  
  export default gameSettings
  