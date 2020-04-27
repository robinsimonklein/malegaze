import * as THREE from "three"
import ThreeEntryPoint from '../ThreeEntryPoint'
import store from '../../../store';

class LoaderManager {
    loadingManager;

    totalToLoad = 0;
    loaded = 0;

    constructor() {
        this.buildLoadingManager()
    }

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
            console.log( 'There was an error loading ' + url );
        }
    }

    load() {
        store.commit('desktop/setLoading', true)
        console.log('🔴️ Start global loading')

        const sceneries = ThreeEntryPoint.sceneManager.sceneryManager.sceneries
        sceneries.forEach(async (scenery) => {
            // Load models
            await scenery.modelManager.loadModels((status) => {
                console.log(scenery.name, Math.round((status.loaded / status.total) * 100))
            })
            console.log(scenery.name, scenery.modelManager.loadedModels)

            // Load videos

            // Load audios
        })
    }

    onLoad() {
        console.log('Loading finished !')
        store.commit('desktop/setLoading', false)

    }

    onProgress(url, itemsLoaded, itemsTotal) {
        store.commit('desktop/setLoadingProgress', (itemsLoaded / itemsTotal) * 100)
    }
}

// Make singleton
const instance = new LoaderManager();
export default instance
