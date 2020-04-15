import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import MobileOrientationControls from "./utils/MobileOrientationControls";
//import Scene1 from "./scenes/Scene1";
import Scene2 from "./scenes/Scene2";

class SceneManager {
    canvas;
    screenDimensions = {
        width: 0,
        height: 0
    };

    camera;
    renderer;
    sceneSubjects;
    mobileControls;
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

       /* this.mobileControls = new MobileOrientationControls(this.camera)
        this.mobileControls.update()*/

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

        let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(-20,200, 520);
        return camera;
    }


    buildOrbit() {
        let orbitControl = new OrbitControls( this.camera, this.renderer.domElement );
        orbitControl.target.set(0,0,0);
        this.camera.position.set(0,100, -600);
        orbitControl.update();

        return orbitControl;
    }


    createSceneSubjects(scene) {
        return [
            new Scene2(scene)
        ];
    }

    update() {
        const elapsedTime = this.clock.getElapsedTime();

        for (let i = 0; i < this.sceneSubjects.length; i++)
            this.sceneSubjects[i].update(elapsedTime);

        //this.mobileControls.update();
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
