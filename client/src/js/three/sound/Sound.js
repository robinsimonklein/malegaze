import * as THREE from "three";
import LoaderManager from './../loader/LoaderManager'

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
     * @param {string} name - The name of the sound
     * @param {string} path - The path of the sound file
     * @param {boolean} [isLoop=false] - Defines if the sound loops
     * @param {number} volume - the volume of the sound
     */
    constructor({
                    name,
                    path,
                    isLoop = false,
                    volume,
                }) {
        this.name = name;
        this.path = path;
        this.isLoop = isLoop;
        this.volume = volume;
    }

    /**
     * Load sounds
     */
    loadSound() {
        this.audioListener = new THREE.AudioListener();

        this.sound = new THREE.Audio(this.audioListener);
        let loader = new THREE.AudioLoader(LoaderManager.loadingManager);

        loader.load(this.path,
            (audioBuffer) => {
                this.sound.setBuffer(audioBuffer);
                this.sound.setLoop(this.isLoop);
                this.sound.setVolume(this.volume)
            }, () => {
            }, (err) => {
                console.log(err);
            })
    }

    /**
     * Add the sound to scene
     * @param {THREE.Scene} scene - The scene in which we want to add the sound
     */
    addToScene(scene) {
        scene.add(this.sound);
    }

    /**
     * Add the sound to camera
     * @param camera - The camera in which we want to add the sound
     */
    addToCamera(camera) {
        camera.add(this.audioListener);
    }

    /**
     * Stop the audio
     */
    stop() {
        this.sound.pause()
    }

}

export default Sound;
