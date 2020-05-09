import MobileOrientationControls from "../controls/MobileOrientationControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import controlsTypes from "../controls/controlsTypes";

/**
 * Allows you to manage the different cameras of a {@link Scenery}.
 */
class CameraManager {
    // Cameras
    cameraObjects = [];
    currentCamera = 0;

    // Controls
    controls;

    /**
     * CameraManager
     * @param {Camera[]} cameras - An array of cameras
     * @param {controlsTypes} [controls=null] - Controls type
     * @param {boolean} [debug=false] - Enable/disable debug mode
     */
    constructor({cameras, controls = null, debug = false}) { // eslint-disable-line
        // Add cameras
        if (cameras) {
            cameras.forEach((camera) => {
                this.addCamera(camera);
            });
        }
        // Build controls
        if (controls) {
            this.buildControls(controls);
        }
    }

    // -- SETTERS

    // ...

    // -- GETTERS

    /**
     * Returns the current {@link Camera} object (with settings, type, ...)
     * @returns {Camera}
     */
    get cameraObject() {
        return this.cameraObjects[this.currentCamera];
    }

    /**
     * Returns the current camera (three.js camera)
     * @returns {*}
     */
    get camera() {
        return this.cameraObjects[this.currentCamera].camera;
    }

    /**
     * Returns the current camera helper (three.js camera)
     * @returns {*}
     */
    get helper() {
        return this.cameraObjects[this.currentCamera].helper;
    }

    /**
     * Returns an array of the cameras (three.js cameras)
     * @returns {Array}
     */
    get cameras() {
        let cameras = [];
        this.cameraObjects.forEach((cameraObject) => {
            cameras.push(cameraObject.camera);
        });
        return cameras;
    }

    // -- METHODS

    /**
     * Add a {@link Camera} to cameraObjects array.
     * Returns the index of the {@link Camera} in the {@link CameraManager}
     * @param {Camera} camera - The {@link Camera} to add
     * @return {number} - Return the index of the {@link Camera}
     */
    addCamera(camera) {
        this.cameraObjects.push(camera);

        // Return the index of the camera
        return this.cameraObjects.length - 1 >= 0 ? this.cameraObjects.length - 1 : 0;
    }

    /**
     * Change current camera
     * @param {number} cameraIndex - The {@link Camera} index
     */
    changeCamera(cameraIndex) {
        this.currentCamera = cameraIndex;
    }

    /**
     * Build controls for current camera
     * @param {controlsTypes} type - Type of the controls
     * @private
     */
    buildControls(type) {
        switch (type) {
            case controlsTypes.MOBILE:
                this.controls = new MobileOrientationControls(this.camera);
                this.controls.alphaOffset = this.cameraObject.settings.alphaOffset ?? 0;
                break;
            case controlsTypes.ORBIT:
                this.controls = new OrbitControls(this.camera, document.body);
                break;
            default:
                break;
        }
    }

    setControls(type){
        this.buildControls(type)
    }

    /**
     * Add elements to scene
     * @param {THREE.Scene} scene - The scene in which we want to add the {@link CameraManager} cameras
     */
    addToScene(scene) {
        this.cameraObjects.forEach((cameraObject) => {
            cameraObject.addToScene(scene)
        })
    }

    /**
     * Update loop
     */
    update() {
        if (this.cameraObject) {
            this.cameraObject.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }

    /**
     * Triggered on window resize
     * @param {number} width - Window width
     * @param {number} height - Window height
     */
    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

export default CameraManager;
