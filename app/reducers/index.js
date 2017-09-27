module.exports = {
  main: (state={
    addr: null,
    balance: null,
    name: null,
    uport: {},
    uportInstance: {},
    width: 50,
    height: 50,
    margin: 10,
    showTooltip: true,
    hideTooltip: false,
    tooltipData: [],
    tooltipTop: true,
    tooltipLeft: true,
    events: []
  }, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          addr: action.payload.addr
        }
      case 'SET_UPORT':
        return {
          ...state,
          addr: action.payload.addr,
          name: action.payload.name,
          uport: action.payload.uport,
          uportInstance: action.payload.uportInstance
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
  ipfs: (state={
    log: {},
  }, action) => {
    switch (action.type) {
      case 'UPDATE_LOG':
        return {
          ...state,
          log: action.payload.log
        }
      default:
        return state
    }
  },
}
