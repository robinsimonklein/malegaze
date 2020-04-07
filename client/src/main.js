import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

// Socket.IO config
const socketUrl = (process.env.VUE_APP_HTTPS === "true" ? 'https://' : 'http://') + process.env.VUE_APP_SERVER_HOST + (process.env.VUE_APP_SERVER_PORT ? ':' + process.env.VUE_APP_SERVER_PORT : '')

Vue.use(new VueSocketIO({
    debug: process.env.NODE_ENV === 'development',
    connection: socketUrl,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },//Optional options
}))

// Create Vue app
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
