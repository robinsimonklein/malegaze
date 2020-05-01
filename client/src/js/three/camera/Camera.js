import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import { PerspectiveCamera, CameraHelper } from "three";
import cameraTypes from "./cameraTypes";

/**
 * @example
 * new Camera({
 *     type: cameraTypes.CINEMATIC,
 *     properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
 *     initialPosition: {x: -50, y: 150, z: -300},
 *     settings: {
 *         alphaOffset: Math.PI,
 *         focusDistance: 530,
 *         // ...
 *     }
 * })
 */
class Camera {
    camera;
    type;
    initialPosition = {x: 0, y: 0, z: 0}
    properties = {
        fov: 1,
        aspectRatio: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1500
    }
    settings = {
        alphaOffset: 0,
        focusDistance: 0,
        focalLength: 24,
        fstop: 4,
        maxblur: 1,
        showFocus: false,
        focalDepth: 3,
        depthBlur: false,
    }
    helper = null

    /**
     * @param {cameraTypes} type - Type of the camera
     * @param {Object} properties - Camera Properties
     * @param {number} properties.fov - Field of view
     * @param {number} properties.aspectRatio - Aspect Ratio
     * @param {number} properties.near - Near
     * @param {number} properties.far - Far
     * @param {{x: number, y: number, z: number}} [initialPosition={x: 0, y: 0, z: 0}] - Initial position of the camera
     * @param {Object} [settings] - Camera settings
     * @param {boolean} [debug=false] - Enable/disable debug mode (shows camera helper)
     *
     * @see https://threejs.org/docs/index.html#api/en/cameras/Camera
     */
    constructor({
        type,
        properties,
        initialPosition = {x: 0, y: 0, z: 0},
        settings,
        debug = false
    }) {
        // Build the camera depending of the type
        switch (type) {
            case cameraTypes.CINEMATIC :
                this.type = type
                this.camera = new CinematicCamera(
                    properties.fov ?? this.properties.fov,
                    properties.aspectRatio ?? this.properties.aspectRatio,
                    properties.near ?? this.properties.near,
                    properties.far ?? this.properties.far
                )
                break;
            case cameraTypes.PERSPECTIVE :
            default :
                this.type = cameraTypes.PERSPECTIVE
                this.camera = new PerspectiveCamera(
                    properties.fov ?? this.properties.fov,
                    properties.aspectRatio ?? this.properties.aspectRatio,
                    properties.near ?? this.properties.near,
                    properties.far ?? this.properties.far,
                )
        }

        // Set the camera position at initial position
        this.setCameraPosition(initialPosition ?? this.initialPosition)
        // Update the camera settings
        if(settings) this.setCameraSettings(settings)
        // Build helper if debug enabled
        if(debug) this.buildHelper()

        if (this.type === cameraTypes.CINEMATIC) this.matChanger()
        this.update()
    }

    // -- GETTERS

    // ...

    // -- METHODS

    /**
     * Set the camera position
     * @param {number} x - Position X
     * @param {number} y - Position Y
     * @param {number} z - Posiiton Z
     */
    setCameraPosition({x, y, z}) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }

    /**
     * Set the camera settings
     * @param {Object} settings - Object of camera settings
     */
    setCameraSettings(settings){
        for(let [key, value] of Object.entries(settings)) {
            if(this.settings[key] !== null && this.settings[key] !== undefined){
                this.settings[key] = value
            }
        }
    }

    /**
     * Build camera helper
     */
    buildHelper() {
        this.helper = new CameraHelper(this.camera);
    }

    /**
     * Mat changer
     * @private
     */
    matChanger() {
        for ( let e in this.settings ) {
            if ( e in this.camera.postprocessing.bokeh_uniforms ) {
                this.camera.postprocessing.bokeh_uniforms[ e ].value = this.settings[e];
            }
        }

        this.camera.postprocessing.bokeh_uniforms[ 'znear' ].value = this.camera.near;
        this.camera.postprocessing.bokeh_uniforms[ 'zfar' ].value = this.camera.far;
        this.camera.setFocalLength( this.settings.focalLength);
        this.settings[ 'focalDepth' ] = this.camera.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;
    }

    /**
     * Add elements (cameras, helpers) to Three.js a scene
     * @param {THREE.Scene} scene - The scene in which we want to add the camera
     */
    addToScene(scene){
        scene.add(this.camera)
        if(this.helper) scene.add(this.helper)
    }

    /**
     * Update loop
     */
    update() {
        // FIXME Update matChanger only if focalLength has changed
        this.camera.setFocalLength( this.settings.focalLength);
        if (this.type === cameraTypes.CINEMATIC){
            this.camera.focusAt( this.settings.focusDistance );
            // this.matChanger()
        }
    }
}

export default Camera
