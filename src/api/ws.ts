export interface WsMessage {
  id?: string
  group?: string
}

export const getWsUrl = () => {
  return 'ws://120.79.169.245/ws/v1/'
}
