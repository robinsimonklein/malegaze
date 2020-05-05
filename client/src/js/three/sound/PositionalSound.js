import * as THREE from "three";

/**
 * A Positional sound is affected to an object position
 */
class PositionalSound {

    sound;
    name;
    path;
    refDistance;
    audioListener;

    /**
     * @param {string} name - Name of the sound
     * @param {string} path - Path of the sound file
     * @param {number} refDistance - Ref distance
     */
    constructor({
        name,
        path,
        refDistance
    }) {

        this.name = name;
        this.path = path;
        this.refDistance = refDistance;

    }

    /**
     * Load the sound
     */
    loadSound() {
        this.audioListener = new THREE.AudioListener();
        this.sound = new THREE.PositionalAudio(this.audioListener);

        let loader = new THREE.AudioLoader();

        loader.load(this.path, (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setRefDistance(this.refDistance);
        })

    }

    /**
     * Add to mesh
     * @param mesh
     */
    addToMesh(mesh) {
        mesh.add(this.sound);
    }

    /**
     * Stop the sound
     */
    stop() {
        this.sound.pause()
    }

}

export default PositionalSound;
