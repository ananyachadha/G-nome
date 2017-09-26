export function setUser(addr) {
  return {
    type: "SET_USER",
    payload: {
      addr: addr
    }
  }
}

export function setUport(addr, name, uport, uportInstance) {
  return {
    type: "SET_UPORT",
    payload: {
      addr: addr,
      name: name,
      uport: uport,
      uportInstance: uportInstance
    }
  }
}

export function setBalance(addr, balance) {
  return {
    type: "SET_BALANCE",
    payload: {
      addr: addr,
      balance: balance,
    }
  }
}
