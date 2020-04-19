import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import store from '../../../store';
import appStates from '../../appStates';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

class Scene2 {

    scene;
    camera;
    screenDimensions;
    controls;
    stats;
    numberEyes = 10;
    particles;
    woman;
    isFinished = false;
    raycaster;

    constructor(scene, screenDimensions, canvas) {
        this.scene = scene;

        this.stats = new Stats();
        document.body.appendChild( this.stats.dom );

        this.particles = null;

        this.buildLight();
        this.importScene();
        //this.buildMirror();
        this.buildEyes();

        this.screenDimensions = screenDimensions;

        this.camera = this.buildCamera(screenDimensions);

        this.raycaster = new THREE.Raycaster();

        this.controls = new OrbitControls(this.camera, canvas); // Bon.. Euh... c'est relou de passer le canvas à voir si y a mieux
        this.controls.update();

        window.addEventListener('click', () => {this.shootEye(event)});

        setTimeout(() => {
            this.eyeAttraction();
        }, 5000)


    }

    buildLight() {
        let light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.position.set(0, 20, 50);
        this.scene.add(light2);
    }

    importScene() {
        const loader = new GLTFLoader();
        const self = this;
        loader.load('models/glb/02_SCENE-02.glb', function (object) {

            object.scene.traverse(function (child) {
                if(child.name === 'ACTRICE') {
                    console.log(child);
                    self.woman = child;
                }
            });
            self.scene.add(object.scene);
        });
    }

    buildMirror() {
        const mirrorGeometry = new THREE.CircleGeometry(500, 32);
        const mirror = new Reflector(mirrorGeometry, {
            clipBias: 0.003,
            textureWidth: window.innerWidth * window.devicePixelRatio, // TODO: May be a problem on resize
            textureHeight: window.innerHeight * window.devicePixelRatio, // TODO: May be a problem on resize
            color: 0x777777,
            recursion: .25
        });

        mirror.position.z = -500;
        mirror.rotateX(-Math.PI / 2);
        this.scene.add(mirror);
    }

    buildEyes() {
        this.scene.remove(this.particles);
        var geometry = new THREE.BufferGeometry();
        let vertices = [];

        this.sprite = new THREE.TextureLoader().load( 'models/images/oeil.png' );


        for ( var i = 0; i < this.numberEyes; i ++ ) {

            var x = this.randomNumber(500, -500);
            var y = this.randomNumber(500, 100);
            var z = this.randomNumber(0, -100);

            vertices.push(x, y, z);

        }

        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        let material = new THREE.PointsMaterial( {map: this.sprite, alphaTest: 0.5, size: 40} );

        this.particles = new THREE.Points( geometry, material );
        this.scene.add( this.particles );


    }

    shootEye(event) {
        if(!this.isFinished) {
            console.log("click");
            let mouse = new THREE.Vector2();
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            this.raycaster.setFromCamera(mouse, this.camera);
            let intersects = this.raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
                console.log("aie");
                this.numberEyes++;
                this.buildEyes();
            }
        }
    }

    eyeAttraction() {

        let particleFrame = requestAnimationFrame(() => {this.eyeAttraction()});

        let positions = this.particles.geometry.attributes.position.array;
        this.particles.geometry.attributes.position.needsUpdate = true;

        var x, y, z, index = 0;

        for (var i = 0; i < this.numberEyes; i ++ ) {

            x = positions[index];
            positions[index] = x + (this.woman.position.x - x) * 0.008;

            index++;
            y = positions[index];
            positions[index] = y + (this.woman.position.y - y) * 0.008;

            index++;
            z = positions[index];
            positions[index] = z + (this.woman.position.z - z) * 0.008;

            console.log(x, y, z);
            if (x > 0 && x < 30 && y > 0 && y < 95 && z < 240) {
                console.log("hit");
                this.isFinished = true;
               cancelAnimationFrame(particleFrame);
            }

        }

    }

    buildCamera({width, height}) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 1;
        const farPlane = 3000;

        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(18.002344131469727, 84.85535430908203, 227.286376953125);
        return camera;
    }

    nextScene() {
        store.dispatch('app/requestState', appStates.SCENE3);
    }

    update() {
        this.controls.update();
        this.stats.begin();

        this.stats.end();

    }

    onWindowResize({width, height}) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

}

export default Scene2;
