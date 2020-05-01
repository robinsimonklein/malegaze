import * as THREE from "three";

/**
 *
 */
class Sound {
    sound;
    type;
    name;
    path;
    volume;
    isLoop;
    audioListener;

    /**
     *
     * @param type
     * @param name
     * @param path
     * @param isLoop
     * @param {HTMLAudioElement} audioListener
     */
    constructor({
        type,
        name,
        path,
        isLoop,
        audioListener
    }) {
        this.sound = new THREE.Audio(audioListener)

    }

    /**
     * Update loop
     */
    update() {

    }

}

export default Sound
