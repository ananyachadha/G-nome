export function setUser(key, name) {
  return {
    type: "SET_USER",
    payload: {
      id: key,
      name: name
    }
  }
}
