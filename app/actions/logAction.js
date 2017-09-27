export function updateLog(log) {
  return {
    type: "UPDATE_LOG",
    payload: {
      log: log
    }
  }
}
