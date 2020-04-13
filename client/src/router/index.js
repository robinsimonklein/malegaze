import Vue from 'vue'
import VueRouter from 'vue-router'
import Desktop from '../views/desktop/Desktop.vue'
import Mobile from "../views/mobile/Mobile";
import MobileIndex from "../views/mobile/MobileIndex";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Desktop',
        component: Desktop
    },
    {
        path: '/mobile',
        name: 'MobileIndex',
        component: MobileIndex,
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
