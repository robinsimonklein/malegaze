import appStates from '../../js/appStates';

export const app = {
    namespaced: true,
    state: {
        appState: process.env.VUE_APP_SKIP_MOBILE_SETUP === "true" ? appStates.SCENE1 : appStates.INDEX
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
        },

        requestState({commit}, value) { // eslint-disable-line
            this._vm.$socket.emit('state_request', value)
        }
    },
}
