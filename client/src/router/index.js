import Vue from 'vue'
import VueRouter from 'vue-router'
import Desktop from '../views/desktop/Desktop.vue'
import Mobile from "../views/mobile/Mobile";
import MobileIndex from "../views/mobile/MobileIndex";
import MobileDetect from "mobile-detect";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Desktop',
        component: Desktop,
        beforeEnter: (to, from, next) => { // eslint-disable-line
            const md = new MobileDetect(window.navigator.userAgent);
            const isMobile = (!!md.mobile());
            isMobile ? next('/mobile') : next()
        }
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
