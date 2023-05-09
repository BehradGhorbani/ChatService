import {Socket} from 'socket.io'
export function socketAuthentication(io: Socket) {

    const secret = process.env["JWT_SECRET"] ? process.env["JWT_SECRET"] : '';

    io.use((socket, next) => {
        return new Promise((resolve, reject) => {
            const token = socket.handshake.auth['token'];

            if (!token) {
                reject({ reason: General_Errors.NO_TOKEN});
            } else {
                verify(token, secret, function (err: any, decoded: any) {
                    if (err) {
                        reject({ reason: General_Errors.NOT_AUTHENTICATED });
                    } else {
                        const user = decoded as User;
                        resolve(user);
                    }
                });
            }
        });
    }).on('connection', (socket: Socket) => {
        socket.emit('21','erweer')
    })
}