import io from "socket.io-client";

export const socket = io("http://localhost:4000");

export function asyncEmit(
  emitEventName: string,
  onEventName: string,
  data: any
): any {
  return new Promise(function (resolve, reject) {
    socket.emit(emitEventName, data);
    socket.on(onEventName, (result) => {
      socket.off(onEventName);
      resolve(result);
    });
    setTimeout(reject, 5000);
  });
}

export async function checkOnlineStatus(auth: {
  name: any;
  username: any;
  user_id: any;
}) {
  const a = await asyncEmit("check-redis", "check-redis-status", {});
  console.log(a);
  if (a.message === false) {
    const a = await asyncEmit("login", "success", {
      name: auth.name,
      username: auth.username,
      user_id: auth.user_id,
    });
    console.log(a);
  }
}


