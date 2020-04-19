import * as THREE from 'three';
import store from '../../store'
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import appStates from '../appStates';
import {PerspectiveCamera} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import Stats from 'three/examples/jsm/libs/stats.module.js';

class SceneManager {
    canvas;
    screenDimensions = {
        width: 0,
        height: 0
    };

    renderer;
    sceneSubjects;

    camera;

    controls;
    stats;

    clock = new THREE.Clock();

    constructor(canvas) {
        this.canvas = canvas;

        // Set screenDimensions with canvas dimensions
        this.screenDimensions.width = canvas.width;
        this.screenDimensions.height = canvas.height;

        this.camera = new PerspectiveCamera(30, canvas.width / canvas.height, 1, 10000)

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.camera.position.set(1000, 3000, 2000)
        this.camera.lookAt(0, 0, 0)
        this.controls.update()

        // Initiate stats
        this.stats = new Stats();
        document.body.appendChild( this.stats.dom );

        this.sceneSubjects = this.createSceneSubjects(this.scene);
    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#1d1428");

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

        this.controls.update()
        this.stats.update();



        // TODO: Améliorer, potentiellement passer le render dans les scenes
        if ( this.sceneSubjects[0].cameras[0].postprocessing && this.sceneSubjects[0].cameras[0].postprocessing.enabled ) {
            this.sceneSubjects[0].cameras[0].renderCinematic( this.scene, this.renderer );
        } else {
            this.renderer.render(this.scene, this.sceneSubjects[0].cameras[0]);
        }



        // this.renderer.render(this.scene, this.camera);

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
