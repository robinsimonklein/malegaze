import * as THREE from 'three';

class SceneSubject {

    radius = 2;
    mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(this.radius, 2), new THREE.MeshStandardMaterial({flatShading: true}));

    constructor(scene) {
        this.mesh.position.set(0, 0, -20);
        scene.add(this.mesh)
    }

    update(time) {
        const scale = Math.sin(time) + 2;

        this.mesh.scale.set(scale, scale, scale);
    }
}

export default SceneSubject


