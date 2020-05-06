import {ID} from "../../js/helpers/Utils";
import EventManager from "../../js/event/EventManager";

export const mobile = {
    namespaced: true,
    state: {
        mobileId: null,
        orientationPermission: false,
        orientation: {},
        screenOrientation: 0,
    },
    getters: {
        mobileUrl: (state) => {
            // Bon c'est dégueu mais jpp donc on verra plus tard hein
            return state.mobileId !== null ? (process.env.VUE_APP_HTTPS === "true" ? 'https://' : 'http://') + process.env.VUE_APP_PUBLIC_HOST + (process.env.VUE_APP_PUBLIC_PORT ? ':' + process.env.VUE_APP_PUBLIC_PORT : '') + '/mobile/' + state.mobileId : null
        }
    },
    mutations: {
        generateMobileId(state) {
            state.mobileId = ID(9)
        },
        setMobileId(state, mobileId) {
            state.mobileId = mobileId
        },
        setOrientationPermission(state, value) {
            state.orientationPermission = value
        },
        setOrientation(state, orientation) {
            state.orientation = orientation
        },
        setScreenOrientation(state, screenOrientation) {
            state.screenOrientation = screenOrientation
        },
    },
    actions: {
        SOCKET_mobile_orientation({commit}, orientation) {
            commit('setOrientation', orientation)
        },
        SOCKET_mobile_screen_orientation({commit}, screenOrientation) {
            commit('setScreenOrientation', screenOrientation)
        },
        SOCKET_mobile_interaction_set({commit}, interaction) { // eslint-disable-line
            EventManager.publish('mobile:interaction_set', interaction)
        },
        SOCKET_mobile_interaction_enable({commit}) { // eslint-disable-line
            EventManager.publish('mobile:interaction_enable')
        }
    },
}
