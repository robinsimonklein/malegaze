import EventManager from "../../js/event/EventManager";

export const desktop = {
    namespaced: true,
    state: {
        loading: false,
        loadingProgress: 0,
        subtitles: null
    },
    getters: {

    },
    mutations: {
        setLoading(state, value) {
            state.loading = value
        },
        setLoadingProgress(state, value) {
            state.loadingProgress = value
        },
        setSubtitles(state, value) {
            state.subtitles = value
        }
    },
    actions: {
        SOCKET_mobile_interaction_done() {
            EventManager.publish('mobile:interaction_done')
        },
        SOCKET_mobile_interaction({commit}, data) { // eslint-disable-line
            EventManager.publish('mobile:interaction', data)
        }
    },
}
