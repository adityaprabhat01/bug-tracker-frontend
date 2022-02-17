export interface NotificationItemInterface {
  _id: string,
  socket_id: string,
  message: string,
  payload: {
    username: string,
    title: string,
    auth?: string
  }
}

export interface NotificationInterface {
  _id: string,
  user_id: string,
  username: string,
  name: string,
  notifications: Array<NotificationItemInterface>
}