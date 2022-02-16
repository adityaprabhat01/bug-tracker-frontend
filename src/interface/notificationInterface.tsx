export interface NotificationItemInterface {
  socket_id: string,
  message: string,
  payload: {
    username: string,
    title: string
  }
}

export interface NotificationInterface {
  _id: string,
  user_id: string,
  username: string,
  name: string,
  notifications: Array<NotificationItemInterface>
}