import CameraManager from "../camera/CameraManager";
import ModelManager from "../model/ModelManager";

class Scenery {
    name;

    cameraManager;
    modelManager;
    audioManager;
    lightManager;

    /**
     * Create a new Scenery
     * @param {String} name
     * @param {[Camera]} cameras
     * @param {controlsTypes} controls
     * @param {[Model]} models
     * @param {Function} onCreated
     */
    constructor({
        name= "undefined",
        cameras,
        controls = null,
        models,
        // lights,
        onCreated = (self) => self

    }) {
        this.name = name

        this.buildCameras(cameras, controls)
        this.buildModels(models)

        if(onCreated !== undefined) onCreated(this)
    }

    /**
     * Build cameras and cameraManager
     * @param {[Camera]} cameras
     * @param {controlsTypes} controls
     */
    buildCameras(cameras, controls) {
        this.cameraManager = new CameraManager({cameras, controls})
    }

    /**
     * Build models and modelManager
     * @param models
     */
    buildModels(models) {
        this.modelManager = new ModelManager({models})
    }

    /**
     * Add elements to scene
     * @param scene
     */
    addToScene(scene) {
        // Add cameras to scene
        this.cameraManager.addToScene(scene)
        // Add models to scene
        this.modelManager.addToScene(scene)
    }

    /**
     * Update loop
     */
    update() {
        this.cameraManager.update()
    }
}
export default Scenery
