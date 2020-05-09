import appStates from '../../js/appStates';
import ThreeEntryPoint from '../../js/three/ThreeEntryPoint';
import MobileDetect from 'mobile-detect';
import EventManager from "../../js/event/EventManager";

export const app = {
    namespaced: true,
    state: {
        appState: process.env.VUE_APP_SKIP_MOBILE_SETUP === "true" ? appStates.END : appStates.INDEX,
        isMobile: false
    },
    getters: {
        appStatesList() {
            return Object.keys(appStates)
        }
    },
    mutations: {
        setAppState(state, value) {
            state.appState = value
        },
        setIsMobile(state, value) {
            state.isMobile = value
        }
    },
    actions: {
        SOCKET_state_dispatch({state, commit}, value) {
            if(!state.isMobile) {
                switch (value) {
                    case appStates.CAMERAMAN:
                    case appStates.ACTRESS:
                    case appStates.SPECTATOR:
                        // If 3D scenery, load the scenery
                        if(ThreeEntryPoint.sceneManager.sceneryManager.scenery.name === `${value}_scenery`){
                            // Scene already loaded
                            break;
                        }else{
                            ThreeEntryPoint.sceneManager.loadSceneryByName(`${value}_scenery`)
                        }
                        break;
                    default:
                        break;
                }
            }
            commit('setAppState', value)
        },
        SOCKET_mobile_shoot() {
            EventManager.publish('actress:click')
            EventManager.publish('actress:click:animation')
        },
        requestState({commit}, value) { // eslint-disable-line
            this._vm.$socket.emit('state_request', value)
        },
        checkMobile({commit}){
            const md = new MobileDetect(window.navigator.userAgent);
            commit('setIsMobile', (!!md.mobile()))
        }
    },
}
