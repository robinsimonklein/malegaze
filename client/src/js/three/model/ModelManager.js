import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import LoaderManager from './../loader/LoaderManager'
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import modelTypes from "./modelTypes";

/**
 * Allows you to manage the different models of a {@link Scenery}. It also manage the different models formats and load them with the good Three.js loader.
 */
class ModelManager {

    models = [];
    loadedModels = [];

    loadersReady = false
    gltfLoader;
    fbxLoader;

    /**
     * ModelManager
     * @param {Model[]} models - Array of models
     * @param {boolean} debug - Enable/Disable debug mode
     */
    constructor({models, debug = false}) { // eslint-disable-line
        if (models) {
            models.forEach((models) => {
                this.addModel(models)
            })
        }
    }

    // --- GETTERS

    /**
     * Get loaded model by name
     * @param {string} name - Name of the model
     * @returns {*}
     */
    getLoadedModelByName(name) {
        if (this.loadedModels.length <= 0) return undefined
        return this.loadedModels.find((loadedModel) => {
            return loadedModel.name === name
        })
    }

    // --- METHODS

    /**
     * Add model to models array
     * @param {Model} model - The {@link Model} to add
     */
    addModel(model) {
        this.models.push(model)
    }

    /**
     * Build the THREE loaders
     * @private
     */
    buildLoaders() {
        this.gltfLoader = new GLTFLoader(LoaderManager.loadingManager);
        this.fbxLoader = new FBXLoader(LoaderManager.loadingManager);
    }

    /**
     * Load all the models from models array in the {@link ModelManager}
     * @async
     */
    loadModels() {
        // Build loader if not built yet
        if (!this.loadersReady) {
            this.buildLoaders()
            this.loadersReady = true
        }

        this.models.forEach((model) => {
            switch (model.type) {
                case modelTypes.GLTF:
                case modelTypes.GLB:
                    this.gltfLoader.load(
                        model.path,
                        (obj) => {
                            obj.name = model.name
                            obj.scene.name = model.name
                            obj.scene.castShadow = model.castShadow
                            obj.scene.receiveShadow = model.receiveShadow
                            this.loadedModels.push(obj)
                        },
                    )
                    break;
                case 'fbx':
                    this.fbxLoader.load(
                        model.path,
                        (obj) => {
                            obj.name = model.name
                            // obj.scene.name = model.name
                            this.loadedModels.push(obj)
                        }
                    )
                    break;
                default:
                    break;
            }
        })

    }

    /**
     * Add models to scene
     * @param {THREE.Scene} scene - The scene in which we want to add the {@link ModelManager} models
     */
    addToScene(scene) {
        if (this.loadedModels.length <= 0) {
            console.error('Error : there is no loaded models')
            return
        }
        this.loadedModels.forEach((loadedModel) => {

            scene.add(loadedModel.scene ? loadedModel.scene : loadedModel)
        })
    }

    /**
     * Update loop
     */
    update() {

    }
}

export default ModelManager
