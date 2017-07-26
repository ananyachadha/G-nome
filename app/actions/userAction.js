export function setUser(addr) {
  return {
    type: "SET_USER",
    payload: {
      addr: addr
    }
  }
}

export function setBalance(addr, balance) {
  return {
    type: "SET_BALANCE",
    payload: {
      addr: addr,
      balance: balance
    }
  }
}
