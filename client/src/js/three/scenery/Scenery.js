import CameraManager from "../camera/CameraManager";
import ModelManager from "../model/ModelManager";
import LightManager from "../light/LightManager";

class Scenery {
    name;
    scene;

    cameraManager;
    modelManager;
    audioManager;
    lightManager;

    onCreated;
    onLoaded;
    onUpdate;

    /**
     * Create a new Scenery
     * @param {String} name
     * @param {[Camera]} cameras
     * @param {controlsTypes} controls
     * @param {[Model]} models
     * @param {[Light]} lights
     * @param {Function} onCreated
     * @param {Function} onLoaded
     * @param {Function} onUpdate
     */
    constructor({
        name = "undefined",
        cameras,
        controls = null,
        models,
        lights,
        onCreated = (self) => self,
        onLoaded = (self) => self,
        onUpdate = (self) => self

    }) {
        this.name = name

        this.buildCameras(cameras, controls)
        this.buildModels(models)
        this.buildLights(lights)

        if(onCreated !== undefined){
            this.onCreated = onCreated
            this.onCreated(this)
        }
        if(onLoaded !== undefined) this.onLoaded = onLoaded
        if(onUpdate !== undefined) this.onUpdate = onUpdate
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
     * Build lights and lightManager
     * @param {[Light]} lights
     */
    buildLights(lights) {
        this.lightManager = new LightManager({lights})
    }

    /**
     * Add elements to scene
     * @param scene
     */
    addToScene(scene) {
        // Add cameras to scene
        if(this.cameraManager) this.cameraManager.addToScene(scene)
        // Add models to scene
        if(this.modelManager) this.modelManager.addToScene(scene)
        // Add lights to scene
        if(this.lightManager) this.lightManager.addToScene(scene)

        // Run onLoaded when scenery is added to scene
        this.onLoaded(this)
    }

    /**
     * Update loop
     */
    update() {
        // Run the scenery's onUpdate method
        if(this.onUpdate) this.onUpdate(this)

        // Run managers update loops
        if(this.cameraManager) this.cameraManager.update()
        if(this.modelManager) this.modelManager.update()
        if(this.lightManager) this.lightManager.update()
        if(this.audioManager) this.audioManager.update()
    }
}
export default Scenery
