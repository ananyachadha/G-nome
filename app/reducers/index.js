module.exports = {
  main: (state={
    id: null,
    name: null
  }, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name
        }
      default:
        return state
    }
  },
}
