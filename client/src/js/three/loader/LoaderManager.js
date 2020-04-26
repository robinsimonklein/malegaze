import * as THREE from "three"

class LoaderManager {
    loadingManager;

    constructor() {
        this.buildLoadingManager()
    }

    buildLoadingManager() {
        this.loadingManager = new THREE.LoadingManager()

        this.loadingManager.onload = () => {
            console.log('Loading complete !')
        }

        this.loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        }

        this.onError = (url) => {
            console.log( 'There was an error loading ' + url );
        }
    }

    load() {
        console.log('Start global loading')
    }
}

// Make singleton
const instance = new LoaderManager();
export default instance
