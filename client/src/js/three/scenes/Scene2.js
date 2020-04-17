import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import store from '../../../store';
import appStates from '../../appStates';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

class Scene2 {

    scene;
    camera;
    screenDimensions;
    controls;

    constructor(scene, screenDimensions, canvas) {
        this.scene = scene;

        this.buildPlane();
        this.buildMirror();

        this.screenDimensions = screenDimensions

        this.camera = this.buildCamera(screenDimensions)


        this.controls = new OrbitControls(this.camera, canvas) // Bon.. Euh... c'est relou de passer le canvas à voir si y a mieux
        this.controls.update()
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
        store.dispatch('app/requestState', appStates.SCENE3);
    }

    update() {
        this.controls.update()
    }

    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

}

export default Scene2;
