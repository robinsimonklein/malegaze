/**
 * The {@link SoundManager} manages all the sounds of a {@link Scenery}.
 */
class SoundManager {
    soundObjects = [];
    currentSound = 0;

    constructor({sounds}) {
        if(sounds) {
            sounds.forEach((sound) => {
                this.addSound(sound)
            })
        }
    }

    addSound(sound) {
        this.soundObjects.push(sound);
        return this.soundObjects.length - 1 >= 0 ? this.soundObjects.length - 1 : 0;
    }

    addToCamera(camera) {
        this.soundObjects.forEach((soundObject) => {
            if(soundObject instanceof Audio) {
                soundObject.addToCamera(camera)
            }
        })
    }

    stopAll() {
        this.soundObjects.forEach((soundObject) => {
            soundObject.stop();
        })
    }

    get soundObject() {
        return this.soundObjects[this.currentSound];
    }

    get sound() {
        return this.soundObjects[this.currentSound].sound;
    }

}

export default SoundManager;
