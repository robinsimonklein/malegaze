import CameraManager from "../camera/CameraManager";
import ModelManager from "../model/ModelManager";

class Scenery {
    name;
    models;

    cameraManager;
    modelManager;

    /**
     * Create a new Scenery
     * @param {String} name
     * @param {[Camera]} cameras
     * @param {controlsTypes} controls
     */
    constructor({
        name= "undefined",
        cameras,
        controls = null
        // lights,
        // models,

    }) {
        this.name = name

        this.buildCameras(cameras, controls)
        this.buildModels()
    }

    /**
     * Build cameras
     * @param {[Camera]} cameras
     * @param {controlsTypes} controls
     */
    buildCameras(cameras, controls) {
        this.cameraManager = new CameraManager({cameras, controls})
    }

    buildModels() {
        this.modelManager = new ModelManager()
    }

    /**
     * Add elements to scene
     * @param scene
     */
    addToScene(scene) {
        // Add cameras to scene
        this.cameraManager.addToScene(scene)
    }

    /**
     * Update loop
     */
    update() {
        this.cameraManager.update()
    }
}
export default Scenery
