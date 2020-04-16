import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store'
import appStates from '../../appStates';
import MobileOrientationControls from "../utils/MobileOrientationControls";

class Scene1 {
    scene;
    camera;
    screenDimensions;
    mobileControls;

    constructor(scene, screenDimensions) {
        this.scene = scene;
        this.buildLight();
        this.buildLoader();
        this.screenDimensions = screenDimensions

        this.camera = this.buildCamera()

        this.mobileControls = new MobileOrientationControls(this.camera)
        this.mobileControls.update()
    }

    buildLight() {
        const light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.position.set(0, 20, 50);
        this.scene.add(light2);
        const ambient = new THREE.HemisphereLight(0xffb8c6, 0x080820);
        this.scene.add(ambient);
    }

    buildLoader() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('models/glb/Scene-01-cellule.gltf', function (object) {

            /* object.scene.traverse(function (child) {
                  if (child.isMesh){
                      // child.material.envMap = envMap;
                      child.castShadow = true;
                      child.receiveShadow = true;
                  }
              }); */

            self.scene.add(object.scene);
        });

    }

    buildCamera() {
        const aspectRatio = this.screenDimensions.width / this.screenDimensions.height ;
        const fov = 60;
        const near = 1;
        const far = 3000;

        const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
        camera.position.set(-20, 200, 520);
        return camera;
    }


    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE2);
    }

    update() {
        this.mobileControls.update()
    }

    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

}

export default Scene1;
