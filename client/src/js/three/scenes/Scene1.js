import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store'
import appStates from '../../appStates';
import MobileOrientationControls from "../utils/MobileOrientationControls";
import MobileControls from "../utils/MobileControls";
import CinemaCamera from "../cameras/CinemaCamera";

class Scene1 {
    scene;

    currentCamera = 0;
    cameras = [];
    cinemaCameras = [];
    orientationControls = []
    // cameraHelpers = [];
    screenDimensions;
    mobileControls;

    params;

    constructor(scene, screenDimensions) {
        this.scene = scene;
        this.buildLight();
        this.buildLoader();
        this.screenDimensions = screenDimensions

        this.buildCameras()
        // this.buildCamerasHelpers()

        this.mobileControls = new MobileControls(this.cinemaCameras[this.currentCamera])
        this.mobileControls.update(['focalLength'])

        this.params = {
            focus: 530,
        };
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
                console.log('An error happened', error);
            }
        );

    }

    buildCameras() {
        const aspectRatio = this.screenDimensions.width / this.screenDimensions.height;
        const fov = 1;
        const near = 1;
        const far = 1500;

        // First camera
        this.cinemaCameras[0] = new CinemaCamera(fov, aspectRatio, near, far);
        this.cinemaCameras[0].focusDistance = 530
        this.cameras[0] = this.cinemaCameras[0].getCamera();
        this.cameras[0].position.set(-50, 150, -300);
        this.scene.add(this.cameras[0])

        this.orientationControls[0] = new MobileOrientationControls(this.cameras[0])
        this.orientationControls[0].alphaOffset = Math.PI // 180° rotation by default
        this.orientationControls[0].update()

        // Second camera
        this.cinemaCameras[1] = new CinemaCamera(fov, aspectRatio, near, far);
        this.cinemaCameras[1].focusDistance = 30
        this.cameras[1] = this.cinemaCameras[1].getCamera();
        this.cameras[1].position.set(-70, 150, 170);
        this.scene.add(this.cameras[1])

        this.orientationControls[1] = new MobileOrientationControls(this.cameras[1])
        this.orientationControls[1].alphaOffset = 0// 0° rotation by default
        this.orientationControls[1].update()

        // Third camera
        this.cinemaCameras[2] = new CinemaCamera(fov, aspectRatio, near, far);
        this.cinemaCameras[2].focusDistance = 530
        this.cameras[2] = this.cinemaCameras[2].getCamera();
        this.cameras[2].position.set(0, 50, 700);
        this.scene.add(this.cameras[2])

        this.orientationControls[2] = new MobileOrientationControls(this.cameras[2])
        this.orientationControls[2].alphaOffset = 0 // 0° rotation by default
        this.orientationControls[2].update()
    }


    buildCamerasHelpers() {
        for (let i = 0; i < this.cameras.length; i++) {
            this.cameraHelpers[i] = new THREE.CameraHelper(this.cameras[i]);
            this.scene.add(this.cameraHelpers[i])
        }
    }


    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE2);
    }

    update() {
        this.cinemaCameras[this.currentCamera].update()
        this.orientationControls[this.currentCamera].update()
        this.mobileControls.update(['focalLength'])
        // this.cameraHelpers[this.currentCamera].update()
    }

    onWindowResize({width, height}) {
        this.cameras[this.currentCamera].aspect = width / height;
        this.cameras[this.currentCamera].updateProjectionMatrix();
    }

}

export default Scene1;
