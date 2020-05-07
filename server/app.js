const fs = require('fs');
const app = require('express')();
const http = require('http');
const https = require('https');
const consola = require('consola');
require('dotenv').config()

// Setup server
let server;
const port = process.env.PORT ? process.env.PORT : 3000
if (process.env.HTTPS === "true" && process.env.NODE_ENV === 'development') {
    server = https.createServer({
        key: fs.readFileSync(`${__dirname}/cert/${process.env.KEY_PEM}`, 'utf8'),
        cert: fs.readFileSync(`${__dirname}/cert/${process.env.PEM}`, 'utf8')
    }, app)
} else {
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
    message: 'Server listening on port ' + port,
    badge: true
})

// IO configuration

io.on('connection', function (socket) {
    console.log('new connexion', socket.id)

    // --- MOBILE ROOM

    socket.on('join_mobile_room', (mobileId) => {
        if (socket.mobileRoom !== null) {
            socket.leave(socket.mobileRoom)
        }
        socket.join(mobileId)
        socket.mobileRoom = mobileId

        console.log(socket.id + ' joined mobile room :', mobileId)
    })

    // --- MOBILE SETUP

    socket.on('mobile_calibrate', () => {
        console.log('mobile_calibrate')
        socket.emit('mobile_calibrate')
        socket.in(socket.mobileRoom).emit('mobile_calibrate')
    });

    socket.on('mobile_ready', () => {
        console.log('mobile_ready')
        socket.emit('mobile_ready')
        socket.in(socket.mobileRoom).emit('mobile_ready')
    });

    // --- MOBILE ORIENTATION

    socket.on('mobile_orientation', (orientation) => {
        socket.in(socket.mobileRoom).emit('mobile_orientation', orientation)
    });

    socket.on('mobile_screen_orientation', (screenOrientation) => {
        socket.in(socket.mobileRoom).emit('mobile_screen_orientation', screenOrientation)
    });

    // --- CAMERA CONTROLS

    socket.on('camera_zoom', (value) => {
        console.log('camera_zoom', value)
        socket.in(socket.mobileRoom).emit('camera_zoom', value)
    });
    socket.on('camera_rec', () => {
        console.log('camera_rec')
        socket.in(socket.mobileRoom).emit('camera_rec')
    });

    // --- MOBILE INTERACTIONS

    socket.on('mobile_shoot', () => {
        socket.in(socket.mobileRoom).emit('mobile_shoot')
    });

    socket.on('mobile_interaction_set', (interaction) => {
        console.log('mobile_interaction_set', interaction)
        socket.in(socket.mobileRoom).emit('mobile_interaction_set', interaction)
    });

    socket.on('mobile_interaction_enable', () => {
        socket.in(socket.mobileRoom).emit('mobile_interaction_enable')
    });

    socket.on('mobile_interaction', (data) => {
        console.log('zoom', data)
        socket.in(socket.mobileRoom).emit('mobile_interaction', data)
    });

    socket.on('mobile_interaction_done', () => {
        socket.in(socket.mobileRoom).emit('mobile_interaction_done')
    });

    // --- APP

    socket.on('state_request', (state) => {
        console.log('state_request', state)
        socket.emit('state_dispatch', state)
        socket.in(socket.mobileRoom).emit('state_dispatch', state)
    })

});
