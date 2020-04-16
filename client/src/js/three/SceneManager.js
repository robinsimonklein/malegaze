import * as THREE from 'three';
import store from '../../store'
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import appStates from '../appStates';

class SceneManager {
    canvas;
    screenDimensions = {
        width: 0,
        height: 0
    };

    renderer;
    sceneSubjects;
    clock = new THREE.Clock();

    constructor(canvas) {
        this.canvas = canvas;

        // Set screenDimensions with canvas dimensions
        this.screenDimensions.width = canvas.width;
        this.screenDimensions.height = canvas.height;

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);

        this.sceneSubjects = this.createSceneSubjects(this.scene);

    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#099");

        return scene;
    }

    clearScene() {
        this.scene = this.buildScene();
        this.sceneSubjects = this.createSceneSubjects(this.scene);
    }

    nextScene() { // TODO: Set camera position based on scene
        for (let i = 0; i < this.sceneSubjects.length; i++) {
            this.sceneSubjects[i].nextScene();
        }
    }

    buildRenderer({width, height}) {
        const renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true, alpha: true});
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    /*

    buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 3000;

        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(-20, 200, 520);
        return camera;
    }

     */

    createSceneSubjects(scene) {
        switch (store.state.app.appState) {
            case appStates.SCENE1:
                return [new Scene1(scene, this.screenDimensions)];
            case appStates.SCENE2:
                return [new Scene2(scene, this.screenDimensions, this.canvas)]; // bon à voir pour le canvas...
            case appStates.SCENE3:
                return [new Scene3(scene, this.screenDimensions, this.canvas)]; // bon à voir pour le canvas...
            default:
                return [];
        }
    }

    update() {
        const elapsedTime = this.clock.getElapsedTime();

        for (let i = 0; i < this.sceneSubjects.length; i++) {
            this.sceneSubjects[i].update(elapsedTime);
        }

        this.renderer.render(this.scene, this.sceneSubjects[0].camera);
    }

    onWindowResize() {
        const {width, height} = this.canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        for (let i = 0; i < this.sceneSubjects.length; i++) {
            this.sceneSubjects[i].onWindowResize({width, height});
        }

        this.renderer.setSize(width, height);
    }
}

export default SceneManager;
