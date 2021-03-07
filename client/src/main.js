import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.config.productionTip = false

// Socket.IO config
const socketUrl = (process.env.VUE_APP_HTTPS === "true" ? 'https://' : 'http://') + process.env.VUE_APP_SERVER_HOST + (process.env.VUE_APP_SERVER_PORT ? ':' + process.env.VUE_APP_SERVER_PORT : '')
const socketConnection = SocketIO(socketUrl, {
    withCredentials: true
})

Vue.use(new VueSocketIO({
    debug: false,
    connection: socketConnection,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

// Create Vue app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
