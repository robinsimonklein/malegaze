import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store'
import appStates from '../../appStates';
import MobileOrientationControls from "../utils/MobileOrientationControls";
import MobileControls from "../utils/MobileControls";
import CinemaCamera from "../cameras/CinemaCamera";
import CameraOverlay from "../overlays/CameraOverlay"

class Scene1 {
    scene;
    model;

    cameraManager;
    orientationControls = []
    mobileControls;
    screenDimensions;

    raycaster;

    constructor(scene, screenDimensions) {
        this.scene = scene;
        this.cameraManager = new CameraManager(scene)

        this.buildLight();
        this.buildLoader();
        this.screenDimensions = screenDimensions

        this.buildCameras()

        this.mobileControls = new MobileControls(this.cameraManager.cameraObject)
        this.mobileControls.update(['focalLength'])

        this.raycaster = new THREE.Raycaster()

        this.scene.fog = new THREE.Fog(0xff4444, 300, 1000);

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

                this.model = object.scene
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
        this.cinemaCameras[1] = new CinemaCamera(fov, aspectRatio, near, far);
        this.cinemaCameras[1].focusDistance = 335
        this.cameras[1] = this.cinemaCameras[1].getCamera();
        this.cameras[1].position.set(-70, 150, 170);
        this.scene.add(this.cameras[1])

        // Set orientationControls for first camera
        this.orientationControls[1] = new MobileOrientationControls(camera2.camera)
        this.orientationControls[1].update()

        // -------------------
        // Third camera
        this.cinemaCameras[2] = new CinemaCamera(fov, aspectRatio, near, far);
        this.cinemaCameras[2].focusDistance = 470
        this.cameras[2] = this.cinemaCameras[2].getCamera();
        this.cameras[2].position.set(0, 50, 700);
        this.scene.add(this.cameras[2])

        // Set orientationControls for first camera
        this.orientationControls[2] = new MobileOrientationControls(camera3.camera)
        this.orientationControls[2].update()
    }

    buildCamerasHelpers() {
        for (let i = 0; i < this.cameras.length; i++) {
            this.cameraHelpers[i] = new THREE.CameraHelper(this.cameras[i]);
            this.scene.add(this.cameraHelpers[i])
        }
    }

    raycasterIntersects() {
        this.raycaster.setFromCamera({x: 0, y: 0}, this.cameras[this.currentCamera])

        let intersects = this.raycaster.intersectObjects(this.model.children);


        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.name === "ACTRICE"){
                if (CameraOverlay.progress < 1) CameraOverlay.progress += 0.005
                return
            }
        }

        CameraOverlay.progress = 0;
    }

    nextScene() {
        store.dispatch('app/requestState', appStates.ACTRESS);
    }

    update() {
        // Update the camera & controllers
        this.cameraManager.update()
        if(this.orientationControls.length > 0) this.orientationControls[0].update()
        this.mobileControls.update(['focalLength'])
        // this.cameraHelpers[this.currentCamera].update()

        if (this.model) {
            this.raycasterIntersects()
        }

    }

    onWindowResize({width, height}) {
        this.cameraManager.onWindowResize({width, height})
    }

}

export default Scene1;
