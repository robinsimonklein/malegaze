import * as THREE from "three";
import LoaderManager from "../loader/LoaderManager";

/**
 * A Positional sound is affected to an object position
 */
class PositionalSound {

    sound;
    name;
    path;
    refDistance;
    volume;
    isLoop;
    audioListener;

    /**
     * @param {string} name - Name of the sound
     * @param {string} path - Path of the sound file
     * @param {number} refDistance - Ref distance
     * @param {volume} volume - Value of volume
     * @param {boolean} isLoop - Bool for sound looping
     */
    constructor({
        name,
        path,
        refDistance,
        volume,
        isLoop
    }) {

        this.name = name;
        this.path = path;
        this.refDistance = refDistance;
        this.volume = volume;
        this.isLoop = isLoop
    }

    /**
     * Load the sound
     */
    loadSound() {
        this.audioListener = new THREE.AudioListener();
        this.sound = new THREE.PositionalAudio(this.audioListener);

        let loader = new THREE.AudioLoader(LoaderManager.loadingManager);

        loader.load(this.path, (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setRefDistance(this.refDistance);
            this.sound.setVolume(this.volume);
            this.sound.setLoop(this.isLoop);

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
     * Add the sound to camera
     * @param camera - The camera in which we want to add the sound
     */
    addToCamera(camera) {
        camera.add(this.audioListener);
    }


    /**
     * Stop the sound
     */
    stop() {
        this.sound.pause()
    }

}

export default PositionalSound;
