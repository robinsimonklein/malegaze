import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera.js';

class CinemaCamera {

    camera;
    position = {
        x: 0,
        y: 0,
        z: 0,
    }
    rotation = {
        x: 0,
        y: 0,
        z: 0,
    }

    focusDistance = 30

    settings = {
        focalLength: 24,
        fstop: 8,
        maxblur: 1,
        showFocus: true,
        focalDepth: 3,
        depthBlur: false,
    }

    constructor(fov, aspectRatio, near, far) {
        this.aspectRatio = aspectRatio
        this.camera = this.build(aspectRatio, fov, near, far)

        this.matChanger();
        this.update()
    }

    build(fov, aspectRatio, near, far) {
        let camera = new CinematicCamera( fov, aspectRatio, near, far );
        camera.position.set(this.position.x, this.position.y, this.position.z)
        camera.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)

        return camera
    }

    getCamera() {
        return this.camera
    }

    matChanger() {
        for ( var e in this.settings ) {
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
        this.camera.focusAt( this.focusDistance );
        // this.matChanger()

        this.camera.setFocalLength( this.settings.focalLength);
    }
}

export default CinemaCamera
