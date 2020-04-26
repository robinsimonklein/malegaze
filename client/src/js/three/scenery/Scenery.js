import CameraManager from "../camera/CameraManager";
import ModelManager from "../model/ModelManager";

class Scenery {
    name;
    models;

    cameraManager;
    modelManager;

    constructor({
        name,
        cameras,
        // lights,
        // models,

    }) {
        this.name = name

        this.buildCameras(cameras)
    }

    /**
     *
     * @param [] cameras
     */
    buildCameras(cameras) {
        this.cameraManager = new CameraManager()

        cameras.map((camera) => {
            this.cameraManager.addCamera(camera)
        })
    }

    buildModels() {
        this.modelManager = new ModelManager()
    }

    /**
     * Update loop
     */
    update() {

    }
}
export default Scenery
