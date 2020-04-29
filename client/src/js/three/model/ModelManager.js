import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import LoaderManager from './../loader/LoaderManager'
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

class ModelManager {

    models = [];
    loadedModels = [];

    loadersReady = false
    gltfLoader;
    fbxLoader;

    /**
     * ModelManager
     * @param {[Model]} models
     * @param {Boolean} debug
     */
    constructor({models, debug = false}) { // eslint-disable-line
        if(models) {
            models.forEach((models) => {
                this.addModel(models)
            })
        }
    }

    // --- GETTERS

    /**
     *
     * @param {String} name
     * @returns {*}
     */
    getLoadedModelByName(name) {
        if(this.loadedModels.length <= 0) return undefined
        return this.loadedModels.find((loadedModel) => {
            return loadedModel.name === name
        })
    }

    // --- METHODS

    /**
     * Add model to models array
     * @param {Model} model
     */
    addModel(model) {
        this.models.push(model)
    }

    /**
     * Build the THREE loaders
     */
    buildLoaders() {
        this.gltfLoader = new GLTFLoader(LoaderManager.loadingManager);
        this.fbxLoader = new FBXLoader(LoaderManager.loadingManager);
    }

    /**
     * Load all the models from models array
     */
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
                            obj.name = model.name
                            obj.scene.name = model.name
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
