import * as THREE from "three";


class Sound {
    sound;
    type;
    name;
    path;
    volume;
    isLoop;
    audioListener;

    constructor({
        type,
        name,
        path,
        isLoop,
        audioListener
    }) {
        this.sound = new THREE.Audio(audioListener)

    }

}