import appStates from "../../js/appStates";

export const app = {
    namespaced: true,
    state: {
        appState: process.env.VUE_APP_SKIP_MOBILE_SETUP === "true" ? appStates.INTRO : appStates.SETUP
    },
    getters: {
        appStatesList() {
            return Object.keys(appStates)
        }
    },
    mutations: {
        setAppState(state, value) {
            state.appState = value
        }
    },
    actions: {
        SOCKET_state_dispatch({commit}, value) {
            commit('setAppState', value)
        }
    },
}
