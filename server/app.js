const fs = require('fs');
const app = require('express')();
const http = require('http');
const https = require('https');
const consola = require('consola');
require('dotenv').config()

// Setup server
let server;
const port = process.env.PORT ? process.env.PORT : 3000
if(process.env.HTTPS === "true" && process.env.NODE_ENV === 'development'){
    server = https.createServer({
        key: fs.readFileSync(`${__dirname}/cert/robin.local+3-key.pem`, 'utf8'),
        cert: fs.readFileSync(`${__dirname}/cert/robin.local+3.pem`, 'utf8')
    }, app)
}else{
    server = http.createServer(app)
}

// Starting logs
console.log('NODE_ENV: ', process.env.NODE_ENV)
console.log('PUBLIC_HOST: ', process.env.PUBLIC_HOST)

// Create io
const io = require('socket.io')(server, {
    origins: `${process.env.PUBLIC_HOST}:* http://${process.env.PUBLIC_HOST}:* https://${process.env.PUBLIC_HOST}:* ` +
            'localhost:* http://localhost:* https://localhost:* ' +
            '127.0.0.1:* http://127.0.0.1:* https://127.0.0.1:* '
});


// Server listen
server.listen(port);

consola.success({
    message: 'Server listening on port '+port,
    badge: true
})

// IO configuration

io.on('connection', function (socket) {
    console.log('new connexion', socket.id)

    socket.on('join_mobile_room', (mobileId) => {
        if (socket.mobileRoom !== null){
            socket.leave(socket.mobileRoom)
        }
        socket.join(mobileId)
        socket.mobileRoom = mobileId

        console.log(socket.id + ' joined mobile room :', mobileId)
    })
});
