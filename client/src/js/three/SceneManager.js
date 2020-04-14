import * as THREE from 'three';
import GeneralLights from './lights/GeneralLights';
import SceneSubject from './SceneSubject';
import Scene1 from "./scenes/Scene1";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class SceneManager {
    canvas;
    screenDimensions = {
        width: 0,
        height: 0
    };

    camera;
    renderer;
    sceneSubjects;
    orbitControls;
    clock = new THREE.Clock();

    constructor(canvas) {
        this.canvas = canvas;
        // Set screenDimensions with canvas dimensions
        this.screenDimensions.width = canvas.width;
        this.screenDimensions.height = canvas.height;

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer(this.screenDimensions);

        this.camera = this.buildCamera(this.screenDimensions);
        this.sceneSubjects = this.createSceneSubjects(this.scene);

        this.orbitControls = this.buildOrbit();

    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#099");

        return scene;
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

    buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 3000;

        return new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    }

    buildOrbit() {
        let orbitControl = new OrbitControls( this.camera, this.renderer.domElement );
        orbitControl.target.set(0,0,0);
        this.camera.position.set(0,100, -500);
        orbitControl.update();
        
        return orbitControl;
    }


    createSceneSubjects(scene) {
        return [
           /* new GeneralLights(scene),
            new SceneSubject(scene),*/
            new Scene1(scene)
        ];
    }

    update() {
        const elapsedTime = this.clock.getElapsedTime();

        for (let i = 0; i < this.sceneSubjects.length; i++)
            this.sceneSubjects[i].update(elapsedTime);

        this.orbitControls.update();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const {width, height} = this.canvas;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }
}

export default SceneManager;
