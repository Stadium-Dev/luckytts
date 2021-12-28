export function handleWebsocketConnection(socket) {

    socket.on('message', message => console.log(message));

}