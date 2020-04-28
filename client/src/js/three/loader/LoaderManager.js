import * as THREE from "three"
import ThreeEntryPoint from '../ThreeEntryPoint'
import store from '../../../store';

class LoaderManager {
    loadingManager;

    constructor() {
        this.buildLoadingManager()
    }

    /**
     * Build the THREE LoadingManager
     */
    buildLoadingManager() {
        this.loadingManager = new THREE.LoadingManager()

        this.loadingManager.onLoad = () => {
            this.onLoad()
        }

        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            this.onProgress(url, itemsLoaded, itemsTotal)
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        }

        this.loadingManager.onError = (url) => {
            console.error( 'There was an error loading ' + url );
        }
    }

    /**
     * Load all the assets (models, audi, ...)
     */
    load() {
        store.commit('desktop/setLoading', true)
        console.log('🔴️ Start global loading')

        const sceneries = ThreeEntryPoint.sceneManager.sceneryManager.sceneries
        sceneries.forEach((scenery) => {
            // Load models
            scenery.modelManager.loadModels()

            // Load audios
            //...
        })
    }

    /**
     * When loaded
     */
    onLoad() {
        console.log('✅ Loading finished !')
        store.commit('desktop/setLoading', false)
    }

    /**
     * On progress
     * @param url
     * @param itemsLoaded
     * @param itemsTotal
     */
    onProgress(url, itemsLoaded, itemsTotal) {
        store.commit('desktop/setLoadingProgress', Math.round((itemsLoaded / itemsTotal) * 100))
    }
}

// Make singleton
const instance = new LoaderManager();
export default instance
