import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import LoaderManager from './../loader/LoaderManager'
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

class ModelManager {

    models = [];
    loadedModels = [];

    loadersReady = false
    gltfLoader;
    fbxLoader;

    status = {
        total: 0,
        loaded: 0
    }

    constructor({models}) {
        if(models) {
            models.forEach((models) => {
                this.addModel(models)
            })
        }
    }

    addModel(model) {
        this.models.push(model)
    }

    buildLoaders() {
        this.gltfLoader = new GLTFLoader(LoaderManager.loadingManager);
        this.fbxLoader = new FBXLoader(LoaderManager.loadingManager);
    }

    loadModels() {

        // Build loader if not built yet
        if(!this.loadersReady) {
            this.buildLoaders()
            this.loadersReady = true
        }

        this.models.forEach((model) => {
            switch (model.type) {
                case 'gltf':
                case 'glb':
                    this.gltfLoader.load(
                        model.path,
                        (obj) => {
                            this.loadedModels.push(obj)
                        },
                    )
                    break;
                case 'fbx':
                    break;
                default:
                    break;
            }
        })

    }

    /**
     * Add models to scene
     * @param scene
     */
    addToScene(scene) {
        if(this.loadedModels.length <= 0){
            console.error('Error : there is no loaded models')
            return
        }
        this.loadedModels.forEach((loadedModel) => {
            scene.add(loadedModel.scene)
        })
    }

    /**
     * Update loop
     */
    update() {

    }
}

export default ModelManager
