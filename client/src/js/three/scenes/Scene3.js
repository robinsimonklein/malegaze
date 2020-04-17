import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store';
import appStates from '../../appStates';
import MobileOrientationControls from "../utils/MobileOrientationControls";

class Scene3 {
    scene;
    camera;
    screenDimensions;
    mobileControls;

    constructor(scene, screenDimensions) {
        this.scene = scene;
        this.buildLight();
        this.buildLoader();

        this.screenDimensions = screenDimensions

        this.camera = this.buildCamera(screenDimensions)

        this.mobileControls = new MobileOrientationControls(this.camera)
        this.mobileControls.update()
    }

    buildLight() {
        const spotLight = new THREE.SpotLight(0xff3bfc);
        spotLight.position.set(0, 100, -550);

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        this.scene.add(spotLight);
    }

    buildLoader() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('models/glb/MaleGaze_SCENES032.glb', function (object) {

            object.scene.traverse(function (child) {
                if (child.isMesh) {
                    // child.material.envMap = envMap;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            self.scene.position.z = -20;
            self.scene.add(object.scene);
        });
    }
    buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 3000;

        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(-20, 200, 520);
        return camera;
    }

    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE1);
    }

    update() {
        this.mobileControls.update()
    }

    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

export default Scene3;
