import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';
import { PerspectiveCamera } from "three";
import cameraTypes from "./cameraTypes";


class Camera {
    camera;
    type;
    fov = 1;
    aspectRatio = window.innerWidth / window.innerHeight;
    near = 1;
    far = 1500;

    settings = {
        focusDistance: 0,
        focalLength: 24,
        fstop: 8,
        maxblur: 1,
        showFocus: false,
        focalDepth: 3,
        depthBlur: false,
    }


    constructor(type) {
        switch (type) {
            case cameraTypes.CINEMATIC :
                this.type = type
                this.camera = new CinematicCamera(this.fov, this.aspectRatio, this.near, this.far)
                break;
            case cameraTypes.PERSPECTIVE :
            default :
                this.type = cameraTypes.PERSPECTIVE
                this.camera = new PerspectiveCamera(this.fov, this.aspectRatio, this.near, this.far)
        }

        if (this.type === cameraTypes.CINEMATIC) this.matChanger()
        this.update()
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

    update() {
        // FIXME Update matChanger only if focalLength changed
        this.camera.setFocalLength( this.settings.focalLength);
        if (this.type === cameraTypes.CINEMATIC){
            this.camera.focusAt( this.settings.focusDistance );
            // this.matChanger()
        }

    }
}

export default Camera
