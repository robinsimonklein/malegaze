import * as THREE from 'three';
import store from '../../store'
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import appStates from '../appStates';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import cameraTypes from "./camera/cameraTypes";
// Sceneries
import SceneryManager from "./scenery/SceneryManager";
import cameraman_scenery from "./scenery/sceneries/cameraman_scenery";
import actress_scenery from "./scenery/sceneries/actress_scenery";
import spectator_scenery from "./scenery/sceneries/spectator_scenery";

class SceneManager {
    canvas;
    renderer;
    screenDimensions = {
        width: 0,
        height: 0
    };

    video;
    sceneryManager;
    sceneSubjects;

    stats;

    clock = new THREE.Clock();

    constructor(canvas) {
        this.canvas = canvas;

        // Set screenDimensions with canvas dimensions
        this.screenDimensions.width = canvas.width;
        this.screenDimensions.height = canvas.height;

        this.video = null;

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);

        // Initiate sceneries
        this.buildSceneries()

        // Initiate stats
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);

    }

    /**
     * Build the THREE scene
     * @returns {Scene}
     */
    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#1d1428");

        return scene;
    }

    /**
     * Clear the THREE scene
     */
    clearScene() {
        this.scene = this.buildScene();

        // FIXME On garde ça ici ?
        this.sceneSubjects = this.createSceneSubjects(this.scene);
    }

    /**
     * Build the renderer
     * @param width
     * @param height
     * @returns {WebGLRenderer}
     */
    buildRenderer({width, height}) {
        const renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true, alpha: true});
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    buildSceneries() {

        // Import sceneries
        let sceneries = []
        sceneries.push(cameraman_scenery)
        sceneries.push(actress_scenery)
        sceneries.push(spectator_scenery)

        this.sceneryManager = new SceneryManager(sceneries, this.scene)
    }

    createSceneSubjects(scene) {
        switch (store.state.app.appState) {
            case appStates.SCENE1:
                return [new Scene1(scene, this.screenDimensions)];
            case appStates.SCENE2:
                return [new Scene2(scene, this.screenDimensions, this.canvas)]; // bon à voir pour le canvas...
            case appStates.SCENE3:
                return [new Scene3(scene, this.screenDimensions, this.canvas, this.video)]; // bon à voir pour le canvas...
            default:
                return [];
        }
    }

    /**
     * Update loop
     */
    update() {
        const elapsedTime = this.clock.getElapsedTime();

        // Cancel rendering if scenery isn't ready
        // if(!this.sceneryManager.scenery.cameraManager) return

        this.stats.update();
        this.sceneryManager.update()

        // Render depending to the camera type
        if(this.sceneryManager.scenery.cameraManager.cameraObject.type === cameraTypes.CINEMATIC){
            this.sceneryManager.scenery.cameraManager.camera.renderCinematic(this.scene, this.renderer);
        }else{
            this.renderer.render(this.scene, this.sceneryManager.scenery.cameraManager.camera);
        }

    }

    /**
     * When window size change
     */
    onWindowResize() {
        const {width, height} = this.canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        this.sceneryManager.onWindowResize({width, height})
        this.renderer.setSize(width, height);
    }
}

export default SceneManager;
