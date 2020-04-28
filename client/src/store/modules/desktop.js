export const desktop = {
    namespaced: true,
    state: {
        loading: false,
        loadingProgress: 0
    },
    getters: {

    },
    mutations: {
        setLoading(state, value) {
            state.loading = value
        },
        setLoadingProgress(state, value) {
            state.loadingProgress = value
        }
    },
    actions: {

    },
}
