import Vue from 'vue'
import Vuex from 'vuex'
import {app} from './modules/app'
import {mobile} from './modules/mobile'
import {desktop} from './modules/desktop'

Vue.use(Vuex)

export default new Vuex.Store({
    // Making sure that we're doing
    // everything correctly by enabling
    // strict mode in the dev environment.
    strict: process.env.NODE_ENV !== 'production',

    modules: {
        app,
        mobile,
        desktop
    }
})
