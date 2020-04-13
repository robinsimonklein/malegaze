import * as THREE from 'three'

class SceneManager {
    canvas;
    screenDimensions = {
        width: 0,
        height: 0
    }

    scene;
    camera;
    renderer;
    sceneSubjects;

    clock = new THREE.Clock()

    constructor(canvas) {
        this.clock = new THREE.Clock();


        this.canvas = canvas

        // Set screenDimensions with canvas dimensions
        this.screenDimensions.width = canvas.width
        this.screenDimensions.height = canvas.height

        this.scene = this.buildScene()
        this.renderer = this.buildRenderer(this.screenDimensions)
        this.camera = this.buildCamera(this.screenDimensions)

        this.initialized = true
    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#099");

        return scene;
    }

    buildRenderer({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 100;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        return camera;
    }

    createSceneSubjects(scene) {
        const sceneSubjects = [
            // new GeneralLights(scene),
            // new SceneSubject(scene)
        ];

        return sceneSubjects;
    }

    update() {
        // const elapsedTime =  this.clock.getElapsedTime();


        this.renderer.render(this.scene, this.camera);
    }
}

export default SceneManager
