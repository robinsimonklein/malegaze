import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store';
import appStates from '../../appStates';

class Scene3 {
    scene;

    constructor(scene) {
        this.scene = scene;
        this.buildLight();
        this.buildLoader();
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

    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE1);
    }

    update() {

    }
}

export default Scene3;
