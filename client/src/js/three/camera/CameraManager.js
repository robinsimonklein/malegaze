import MobileOrientationControls from "../controls/MobileOrientationControls";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import controlsTypes from "../controls/controlsTypes";

class CameraManager {
    // Cameras
    cameraObjects = [];
    currentCamera = 0;

    // Controls
    controls;

    /**
     * CameraManager
     * @param {[Camera]} cameras
     * @param {*} controls
     * @param {Boolean} debug
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
     * Returns the current camera object (with settings, type, ...)
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
     * Returns all the cameras (three.js camera)
     * @returns {*}
     */
    get cameras() {
        let cameras = [];
        this.cameraObjects.map((cameraObject) => {
            this.cameras.push(cameraObject.camera);
        });
        return cameras;
    }

    // -- METHODS

    /**
     * Add a camera to cameras array
     * @param camera
     */
    addCamera(camera) {
        this.cameraObjects.push(camera);

        // Return the index of the camera
        return this.cameraObjects.length - 1 >= 0 ? this.cameraObjects.length - 1 : 0;
    }

    /**
     * Change current camera
     * @param cameraIndex
     */
    changeCamera(cameraIndex) {
        this.currentCamera = cameraIndex;
    }

    /**
     * Build controls for current camera
     * @param {controlsTypes} type
     */
    buildControls(type) {
        switch (type) {
            case controlsTypes.MOBILE:
                this.controls = new MobileOrientationControls(this.camera);
                this.controls.alphaOffset = this.cameraObject.settings.alphaOffset ?? 0;
                break;
            case controlsTypes.ORBIT:
            default:
                this.controls = new OrbitControls(this.camera);
                break;
        }
    }

    /**
     * Add elements to scene
     * @param scene
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
     * @param width
     * @param height
     */
    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

export default CameraManager;
