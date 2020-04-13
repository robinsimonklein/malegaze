import appStates from "../../js/appStates";

export const app = {
    namespaced: true,
    state: {
        appState: appStates.SETUP,
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
