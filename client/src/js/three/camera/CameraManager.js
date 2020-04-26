import * as THREE from "three";
import Camera from "./Camera";

class CameraManager {
    scene;

    // Cameras
    cameraObjects = [];
    currentCamera = 0;

    // Helpers
    helpersEnabled = false;
    cameraHelpers = [];

    constructor(scene) {
        this.scene = scene

        if (this.helpersEnabled) this.buildCameraHelpers()
        this.update()
    }

    // -- SETTERS

    /**
     * Enable / Disable helpers
     * @param {Boolean} value
     */
    set helpers(value) {
        if(value === true){
            // Build the helpers if not yet built
            if(this.cameraHelpers.length <= 0) this.buildCameraHelpers()
        }
        this.helpersEnabled = value
    }

    // -- GETTERS

    /**
     * Returns the current camera object (with settings, type, ...)
     * @returns {Camera}
     */
    get cameraObject() {
        return this.cameraObjects[this.currentCamera]
    }

    /**
     * Returns the current camera (three.js camera)
     * @returns {*}
     */
    get camera() {
        return this.cameraObjects[this.currentCamera].camera
    }

    /**
     * Returns all the cameras (three.js camera)
     * @returns {*}
     */
    get cameras() {
        let cameras = []
        this.cameraObjects.map((cameraObject) => {
            this.cameras.push(cameraObject.camera)
        })
        return cameras
    }

    // -- METHODS

    /**
     * Add a camera to cameras array
     * @param camera
     */
    addCamera(camera){
        this.cameraObjects.push(camera)
        // this.scene.add(camera.camera)

        // Return the index of the camera
        return this.cameraObjects.length - 1 >= 0 ? this.cameraObjects.length - 1 : 0
    }

    createCamera(type, {fov, aspectRatio, near, far}){
        try {
            let camera = new Camera(type, {fov, aspectRatio, near, far })
            let index = this.addCamera(camera)

            // Return the created cameraObject
            return this.cameraObjects[index]
        }
        catch (error) {
            console.error(error)
        }
    }

    /**
     * Build CameraHelper for all cameras
     */
    buildCameraHelpers() {
        for (let i = 0; i < this.cameraObjects.length; i++) {
            this.cameraHelpers[i] = new THREE.CameraHelper(this.cameraObjects[i].camera);
            this.scene.add(this.cameraHelpers[i])
        }
    }

    /**
     * Update loop
     */
    update() {
        if(this.cameraObject) this.cameraObject.update()
    }

    /**
     * Triggered on window resize
     * @param width
     * @param height
     */
    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

export default CameraManager
