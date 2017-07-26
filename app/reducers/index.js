module.exports = {
  main: (state={
    addr: null,
    balance: null
  }, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          addr: action.payload.addr
        }
      case 'SET_BALANCE':
        return {
          ...state,
          addr: action.payload.addr,
          balance: action.payload.balance
        }
      default:
        return state
    }
  },
}
