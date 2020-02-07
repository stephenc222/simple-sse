// call this in some root-level "mount"
export const initSubscriber = (endpoint, onUpdate, onError) => {
  const evtSource = new EventSource(endpoint, { withCredentials: true });
  evtSource.onerror = function (err) {
    console.error("EventSource failed:", err);
    onError(`${err}`)
  };
  evtSource.addEventListener("ping", function (event) {
    console.log('ping', event.data)
  });
  evtSource.onmessage = function (event) {
    console.log('MESSAGE:', event.data)
    onUpdate(event.data)
  }
  evtSource.onopen = function (event) {
    console.log('ON OPEN')
  }
}
