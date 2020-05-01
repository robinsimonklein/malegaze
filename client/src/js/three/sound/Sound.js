import * as THREE from "three";

/**
 *
 */
class Sound {
    sound;
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
        name,
        path,
        isLoop,
        volume,
    }) {
        this.name = name;
        this.path = path;
        this.isLoop = isLoop;
        this.volume = volume;
        this.loadSound()
    }

    loadSound() {

        this.audioListener = new THREE.AudioListener();

        this.sound = new THREE.Audio(this.audioListener);
        let loader = new THREE.AudioLoader();

        loader.load(this.path,
            (audioBuffer) => {
            this.sound.setBuffer( audioBuffer );
            this.sound.setLoop( this.isLoop );
            this.sound.setVolume(this.volume)
        })
    }

    addToScene(scene) {
        scene.add(this.sound);
    }

    addToCamera(camera) {
        camera.add(this.audioListener);
    }

    stop() {
        this.sound.pause()
    }

}

export default Sound;