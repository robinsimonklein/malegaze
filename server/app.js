const fs = require('fs');
const path = require('path');
const app = require('express')();
const http = require('http');
const https = require('https');
const consola = require('consola');
require('dotenv').config()

// Setup server
let server;
const port = process.env.PORT ? process.env.PORT : 3000

if (process.env.HTTPS === "true" && process.env.NODE_ENV === 'development') {
    const projectDir = path.join(__dirname, '../')
    server = https.createServer({
        key: fs.readFileSync(path.join(projectDir, `/cert/${process.env.KEY_PEM}`), 'utf8'),
        cert: fs.readFileSync(path.join(projectDir, `/cert/${process.env.PEM}`), 'utf8')
    }, app)
} else {
    server = http.createServer(app)
}

// Starting logs
console.log('HTTPS: ', process.env.HTTPS)
console.log('NODE_ENV: ', process.env.NODE_ENV)
console.log('PUBLIC_HOST: ', process.env.PUBLIC_HOST)

// Create io
const io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
        origin: [
            `${process.env.PUBLIC_HOST}:8080`, `http://${process.env.PUBLIC_HOST}:8080`, `https://${process.env.PUBLIC_HOST}:8080`,
            `${process.env.PUBLIC_HOST}`, `http://${process.env.PUBLIC_HOST}`, `https://${process.env.PUBLIC_HOST}`,
            'localhost:* http://localhost:*', 'https://localhost:*', 'localhost:* http://localhost', 'https://localhost',
            '127.0.0.1:* http://127.0.0.1:*', 'https://127.0.0.1:*', '127.0.0.1:* http://127.0.0.1', 'https://127.0.0.1',
            'male-gaze.com:*', 'http://male-gaze.com:*', 'https://male-gaze.com:*',
            'male-gaze.com', 'http://male-gaze.com', 'https://male-gaze.com'
        ],
        methods: ["GET", "POST"],
        credentials: true
    },
    /*
    origins:
     */
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

    socket.on('ask_mobile_room', (mobileId, callback) => {
        io.sockets.adapter.rooms.has(mobileId) ? callback(true) : callback(false)
    })

    // --- DISCONNECT


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

    // --- CAMERA CONTROLS

    socket.on('camera_zoom', (value) => {
        socket.in(socket.mobileRoom).emit('camera_zoom', value)
    });
    socket.on('camera_rec', () => {
        socket.in(socket.mobileRoom).emit('camera_rec')
    });

    // --- MOBILE INTERACTIONS

    socket.on('mobile_shoot', () => {
        socket.in(socket.mobileRoom).emit('mobile_shoot')
    });

    socket.on('mobile_interaction_set', (interaction) => {
        socket.in(socket.mobileRoom).emit('mobile_interaction_set', interaction)
    });

    socket.on('mobile_interaction_enable', () => {
        socket.in(socket.mobileRoom).emit('mobile_interaction_enable')
    });

    socket.on('mobile_interaction', (data) => {
        socket.in(socket.mobileRoom).emit('mobile_interaction', data)
    });

    socket.on('mobile_interaction_done', () => {
        socket.in(socket.mobileRoom).emit('mobile_interaction_done')
    });

    socket.on('mobile_show_instruction', () => {
        socket.in(socket.mobileRoom).emit('mobile_show_instruction')
    });

    socket.on('mobile_scrolled', () => {
       socket.in(socket.mobileRoom) .emit('mobile_scrolled')
    });


    // --- APP

    socket.on('state_request', (state) => {
        console.log('state_request', state)
        socket.emit('state_dispatch', state)
        socket.in(socket.mobileRoom).emit('state_dispatch', state)
    })

    socket.on('ask_state', () => {
        console.log('ask_state')
        socket.in(socket.mobileRoom).emit('ask_state')
    })

    socket.on('answer_state', (state) => {
        console.log('answer_state', state)
        socket.in(socket.mobileRoom).emit('state_dispatch', state)
    })

    socket.on('mobile_allow_next', () => {
        console.log('mobile_allow_next')
        socket.in(socket.mobileRoom).emit('mobile_allow_next')
    })

});
