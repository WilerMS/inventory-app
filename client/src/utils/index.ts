export const unsubscribe = (eventName: string, listener: (e) => void) => {
  document.removeEventListener(eventName, listener)
}

export const subscribe = (eventName: string, listener: (e) => void) => {
  document.addEventListener(eventName, listener)
  return () => unsubscribe(eventName, listener)
}

export const publish = (eventName: string, data: any) => {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}
