import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import { PerspectiveCamera, CameraHelper } from "three";
import cameraTypes from "./cameraTypes";


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
     *
     * @param {cameraTypes} type
     * @param {{fov, aspectRatio, near, far}} properties
     * @param {{x: Number, y: Number, z: Number}} initialPosition
     * @param {*} settings
     * @param {Boolean} debug
     */
    constructor({
        type,
        properties,
        initialPosition,
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
        if(settings) this.updateCameraSettings(settings)
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
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     */
    setCameraPosition({x, y, z}) {
        this.camera.position.x = x;
        this.camera.position.y = y;
        this.camera.position.z = z;
    }

    /**
     * Update the camera settings
     * @param settings
     */
    updateCameraSettings(settings){
        for(let [key, value] of Object.entries(settings)) {
            if(this.settings[key] !== null && this.settings[key] !== undefined){
                this.settings[key] = value
            }
        }
    }

    /**
     * Build helper
     */
    buildHelper() {
        this.helper = new CameraHelper(this.camera);
    }

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
     * Add elements to scene
     * @param scene
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
