import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from '../../../store';
import appStates from '../../appStates';
import MobileOrientationControls from '../utils/MobileOrientationControls';

class Scene3 {
    scene;
    camera;
    screenDimensions;
    mobileControls;
    video;
    eyes = [];

    constructor(scene, screenDimensions, canvas, video) {
        this.scene = scene;
        this.video = video;

        this.buildLight();
        this.buildLoader();
        this.buildScreen();
        this.createActor([1200, 270]);
        this.createActor([-1200, 270]);

        this.screenDimensions = screenDimensions;

        this.camera = this.buildCamera(screenDimensions);

        this.mobileControls = new MobileOrientationControls(this.camera);
        this.mobileControls.update();
    }

    createActor(position) {
        const objects = [];

        const sphereGeometry = new THREE.SphereGeometry(35, 100, 100);
        const material = new THREE.MeshStandardMaterial({color: 0xffffff});

        const actress = new THREE.Object3D();
        this.scene.add(actress);
        objects.push(actress);

        actress.position.x = position[0];
        actress.position.y = 200;
        actress.position.z = position[1];

        for (let i = 0; i < 3; i++) {
            const eye = new THREE.Mesh(sphereGeometry, material);
            switch (i) {
                case 0:
                    eye.position.x = 100;
                    eye.position.y = -50;
                    break;
                case 1:
                    eye.position.x = -100;
                    eye.position.y = 50;
                    break;
                case 2:
                    eye.position.x = 300;
                    eye.position.z = 200;
            }
            actress.add(eye);
            objects.push(eye);
        }
        this.eyes.push(objects);
    }

    buildLight() {
        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 100, -510);

        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        spotLight.shadow.camera.near = 500;
        spotLight.shadow.camera.far = 4000;
        spotLight.shadow.camera.fov = 30;

        this.scene.add(spotLight);


        const ambient = new THREE.HemisphereLight(0xffb8c6, 0x080820);
        this.scene.add(ambient);
    }

    buildLoader() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('models/glb/MaleGaze_SCENES032.glb', function (object) {

            object.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            self.scene.position.z = -20;
            self.scene.add(object.scene);
        });
    }

    buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 3000;

        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(-20, 200, 520);
        return camera;
    }

    buildScreen() {
        const geometry = new THREE.BoxGeometry(615, 305, 10);

        const videoTexture = new THREE.VideoTexture(this.video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        const material = new THREE.MeshPhongMaterial({map: videoTexture});

        const face5 = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];

        geometry.faceVertexUvs[0] = [];
        geometry.faceVertexUvs[0][8] = [face5[3], face5[0], face5[2]];
        geometry.faceVertexUvs[0][9] = [face5[0], face5[1], face5[2]];

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = 0;
        mesh.position.y = 231;
        mesh.position.z = -505;

        this.scene.add(mesh);

        this.video.play();

        // Listen when video has finished
        this.video.addEventListener('ended', () => {
            this.nextScene()
        })
    }

    nextScene() {
        store.dispatch('app/requestState', appStates.END);
    }

    update() {
        this.mobileControls.update();
        this.eyes.forEach((objects) => {
            objects.forEach((item) => {
                item.rotation.y += 0.02;
            });
        });
    }

    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

export default Scene3;
