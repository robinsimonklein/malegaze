import * as THREE from "three";

class PositionalSound {

    sound;
    name;
    path;
    refDistance;
    audioListener;

    constructor({
        name,
        path,
        refDistance
    }) {

        this.name = name;
        this.path = path;
        this.refDistance = refDistance;
        this.loadSound();

    }

    loadSound() {
        this.audioListener = new THREE.AudioListener();
        this.sound = new THREE.PositionalAudio(this.audioListener);

        let loader = new THREE.AudioLoader();

        loader.load(this.path, (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setRefDistance(this.refDistance);
        })

    }

    addToMesh(mesh) {
        mesh.add(this.sound);
    }

    stop() {
        this.sound.pause()
    }

}

export default PositionalSound;