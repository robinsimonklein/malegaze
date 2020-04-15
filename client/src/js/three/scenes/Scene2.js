import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';

class Scene2 {

    scene;
    constructor(scene) {
        this.scene = scene;


        this.buildPlane();
        this.buildMirror();
    }

    buildPlane() {
        let planeGeometry = new THREE.PlaneGeometry(200,200);
        let planeMaterial = new THREE.MeshStandardMaterial();

        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI/2;
        this.scene.add(plane);

        let grid = new THREE.GridHelper(200,80);
        this.scene.add(grid);
    }

    buildMirror() {
        let mirrorGeometry = new THREE.CircleGeometry(50,32);
        let mirror = new Reflector(mirrorGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio,
            textureHeight: window.innerHeight * window.devicePixelRatio,
            color: 0x777777,
            recursion: 1
        });

        mirror.position.y = 0.5;
        mirror.rotateX( - Math.PI / 2 );
        this.scene.add( mirror );
    }

    update() {

    }

}

export default Scene2;