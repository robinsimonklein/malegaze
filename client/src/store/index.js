import Vue from 'vue'
import Vuex from 'vuex'
import {mobile} from './modules/mobile'

Vue.use(Vuex)

export default new Vuex.Store({
    // Making sure that we're doing
    // everything correctly by enabling
    // strict mode in the dev environment.
    strict: process.env.NODE_ENV !== 'production',

    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        mobile
    }
})
