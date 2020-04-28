import {ID} from "../../js/helpers/Utils";

export const mobile = {
    namespaced: true,
    state: {
        mobileId: null,
        orientationPermission: false,
        orientation: {},
        screenOrientation: 0,
        controls: {
            focalLength: 24
        }
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
        setControls(state, controls) {
            Object.keys(controls).forEach((key) => {
                state.controls[key] = controls[key]
            });
        }
    },
    actions: {
        SOCKET_mobile_orientation({commit}, orientation) {
            commit('setOrientation', orientation)
        },
        SOCKET_mobile_screen_orientation({commit}, screenOrientation) {
            commit('setScreenOrientation', screenOrientation)
        },
        SOCKET_mobile_controls({commit}, controls) {
            commit('setControls', controls)
        }
    },
}
