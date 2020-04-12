import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/desktop/Home.vue'
import Mobile from "../views/mobile/Mobile";
import MobileHome from "../views/mobile/MobileHome";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/mobile',
        name: 'MobileHome',
        component: MobileHome,
    },
    {
        path: '/mobile/:mobileId',
        name: 'Mobile',
        component: Mobile
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
