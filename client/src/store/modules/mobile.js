import {ID} from "../../js/helpers/Utils";
import EventManager from "../../js/event/EventManager";

export const mobile = {
    namespaced: true,
    state: {
        mobileId: null,
        orientationPermission: false,
        orientation: {},
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
    },
    actions: {
        SOCKET_mobile_orientation({commit}, orientation) {
            EventManager.publish('mobile:orientation', orientation)
            commit('setOrientation', orientation)
        },
        SOCKET_mobile_interaction_set({commit}, interaction) { // eslint-disable-line
            EventManager.publish('mobile:interaction_set', interaction)
        },
        SOCKET_mobile_interaction_enable({commit}) { // eslint-disable-line
            EventManager.publish('mobile:interaction_enable')
        },
        SOCKET_mobile_show_instruction() {
            EventManager.publish('actress:showInstructionMobile')
        }
    },
}
