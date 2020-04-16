import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import store from '../../../store';
import appStates from '../../appStates';

class Scene2 {

    scene;

    constructor(scene) {
        this.scene = scene;

        this.buildPlane();
        this.buildMirror();
    }

    buildPlane() {
        const planeGeometry = new THREE.PlaneGeometry(200, 200);
        const planeMaterial = new THREE.MeshStandardMaterial();

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        this.scene.add(plane);

        const grid = new THREE.GridHelper(200, 80);
        this.scene.add(grid);
    }

    buildMirror() {
        const mirrorGeometry = new THREE.CircleGeometry(50, 32);
        const mirror = new Reflector(mirrorGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio, // TODO: May be a problem on resize
            textureHeight: window.innerHeight * window.devicePixelRatio, // TODO: May be a problem on resize
            color: 0x777777,
            recursion: 1
        });

        mirror.position.y = 0.5;
        mirror.rotateX(-Math.PI / 2);
        this.scene.add(mirror);
    }

    update() {

    }

    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE3);
    }

}

export default Scene2;
