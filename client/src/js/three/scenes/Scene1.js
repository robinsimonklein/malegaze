import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store'
import appStates from "../../appStates";

class Scene1 {

    scene;
    constructor(scene) {

        this.scene = scene;
        this.buildLight();
        this.buildLoader();

        window.addEventListener('keypress', (e) => {
            if(e.which === 32){
                this.nextScene()
            }
        })
    }

    buildLight() {

        let light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.position.set( 0,20, 50);
        this.scene.add(light2);
        let ambient = new THREE.HemisphereLight(0xffb8c6, 0x080820);
        this.scene.add(ambient);

    }

    buildLoader() {

        let loader = new GLTFLoader();
        let self = this;
        loader.load('models/glb/Scene-01-cellule.gltf', function (object) {

          /*  object.scene.traverse(function (child) {
                if (child.isMesh){
                    // child.material.envMap = envMap;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });*/
            self.scene.add(object.scene);
        });

    }

    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE2)
    }

    update() {

    }

}

export default Scene1;
