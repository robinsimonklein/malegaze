/**
 * The {@link SoundManager} manages all the sounds of a {@link Scenery}.
 */
class SoundManager {
    soundObjects = [];
    currentSound = 0;

    // --- GETTERS

    /**
     * Get the current sound
     * @return {Sound | PositionalSound}
     */
    get soundObject() {
        return this.soundObjects[this.currentSound];
    }

    /**
     * Get the current THREE Sound
     * @return {*}
     */
    get sound() {
        return this.soundObjects[this.currentSound].sound;
    }

    // --- METHODS

    /**
     * @param {Sound[]} sounds - Array of sounds
     */
    constructor({sounds}) {
        if(sounds) {
            sounds.forEach((sound) => {
                this.addSound(sound)
            })
        }
    }

    loadSound() {
        this.soundObjects.forEach((sound) => {
            sound.loadSound()
        })
    }

    /**
     * Add a sound to {@link SoundManager}
     * @param {Sound} sound - The sound to add
     * @return {number} index - The index of the {@link Sound} in the {@link SoundManager}
     */
    addSound(sound) {
        this.soundObjects.push(sound);
        return this.soundObjects.length - 1 >= 0 ? this.soundObjects.length - 1 : 0;
    }

    /**
     * Add to camera
     * @param camera
     */
    addToCamera(camera) {
        this.soundObjects.forEach((soundObject) => {
            if(soundObject instanceof Audio) {
                soundObject.addToCamera(camera)
            }
        })
    }

    /**
     * Stop all the sounds
     */
    stopAll() {
        this.soundObjects.forEach((soundObject) => {
            soundObject.stop();
        })
    }

}

export default SoundManager;
