import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store'
import appStates from '../../appStates';
import MobileControls from "../controls/MobileControls";
import CameraManager from "../camera/CameraManager";
import cameraTypes from "../camera/cameraTypes";
import MobileOrientationControls from "../controls/MobileOrientationControls";

class Scene1 {
    scene;

    cameraManager;
    orientationControls = []
    mobileControls;
    screenDimensions;

    constructor(scene, screenDimensions) {
        this.scene = scene;
        this.cameraManager = new CameraManager(scene)

        this.buildLight();
        this.buildLoader();
        this.screenDimensions = screenDimensions

        this.buildCameras()

        this.mobileControls = new MobileControls(this.cameraManager.cameraObject)
        this.mobileControls.update(['focalLength'])

    }

    buildLight() {
        const light2 = new THREE.DirectionalLight(0xff4444, 1);
        light2.position.set(0, 200, -700);
        light2.castShadow = true;
        this.scene.add(light2);

        const ambient = new THREE.HemisphereLight(0xffb8c6, 0x080820);
        ambient.position.set(0, 300, 0)
        this.scene.add(ambient);
    }

    buildLoader() {
        const loader = new GLTFLoader();

        loader.load('models/glb/scene-01.glb',
            (object) => {

                object.scene.traverse((child) => {


                    if (child.isMesh) {

                        // child.material.envMap = envMap;
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                this.scene.add(object.scene);
            },
            (xhr) => {
                console.log(Math.round(xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );

    }

    buildCameras() {
        const aspectRatio = this.screenDimensions.width / this.screenDimensions.height;
        const fov = 1;
        const near = 1;
        const far = 1500;

        // -------------------
        // First camera
        let camera1 = this.cameraManager.createCamera(cameraTypes.CINEMATIC, {fov, aspectRatio, near, far})
        camera1.settings.focusDistance = 530
        camera1.camera.position.set(-50, 150, -300)
        camera1.settings.showFocus = true

        // Set orientationControls for first camera
        this.orientationControls[0] = new MobileOrientationControls(camera1.camera)
        this.orientationControls[0].alphaOffset = Math.PI // 180° rotation by default
        this.orientationControls[0].update()

        // -------------------
        // Second camera
        let camera2 = this.cameraManager.createCamera(cameraTypes.CINEMATIC, {fov, aspectRatio, near, far});
        camera2.settings.focusDistance = 300
        camera2.camera.position.set(-70, 150, 170)

        // Set orientationControls for first camera
        this.orientationControls[1] = new MobileOrientationControls(camera2.camera)
        this.orientationControls[1].update()

        // -------------------
        // Third camera
        let camera3 = this.cameraManager.createCamera(cameraTypes.CINEMATIC, {fov, aspectRatio, near, far});
        camera3.settings.focusDistance = 470
        camera3.camera.position.set(0, 50, 700)

        // Set orientationControls for first camera
        this.orientationControls[2] = new MobileOrientationControls(camera3.camera)
        this.orientationControls[2].update()
    }

    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE2);
    }

    update() {
        // Update the camera & controllers
        this.cameraManager.update()
        if(this.orientationControls.length > 0) this.orientationControls[0].update()
        this.mobileControls.update(['focalLength'])
    }

    onWindowResize({width, height}) {
        this.cameraManager.onWindowResize({width, height})
    }

}

export default Scene1;
