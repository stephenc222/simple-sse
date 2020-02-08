// call this in some root-level "mount"
const DEFAULT_SSE_ENDPOINT = 'http://localhost:4000/streaming'
export const initSubscriber = (
  onUpdate,
  onError,
  endpoint = DEFAULT_SSE_ENDPOINT,
  customSSEListeners = [{ type: '', func: () => { } }],
  onOpen = () => { },
) => {
  const evtSource = new EventSource(endpoint, { withCredentials: true })
  evtSource.onerror = function (errEvent) {
    onError(errEvent)
  };
  evtSource.onmessage = function (event) {
    onUpdate(event)
  }
  evtSource.onopen = function (event) {
    onOpen(event)
  }
  // means, set by consumer
  if (customSSEListeners.length && customSSEListeners[0].type) {
    customSSEListeners.forEach(({ type, func }) => {
      evtSource.addEventListener(type, func)
    })
  }
  // adds api for consumer to determine when to close the connection
  return { close: () => evtSource.close() }
}
