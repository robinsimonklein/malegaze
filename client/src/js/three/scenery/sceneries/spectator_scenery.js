import Scenery from '../Scenery';
import Camera from '../../camera/Camera';
import Model from '../../model/Model';
import Light from '../../light/Light';
import cameraTypes from '../../camera/cameraTypes';
import controlsTypes from '../../controls/controlsTypes';
import * as THREE from 'three';

export default new Scenery({
    name: 'spectator_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: {fov: 60, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 8000},
            initialPosition: {x: -20, y: 200, z: 520},
        }),
    ],
    controls: controlsTypes.MOBILE,
    models: [
        new Model({
            name: 'cinema',
            path: 'models/glb/spectator_scenery.glb',
            type: 'glb'
        })
    ],
    lights: [
        new Light({
            name: 'ambient',
            light: new THREE.HemisphereLight(0xffb8c6, 0x080820),
        }),
        new Light({
            name: 'spotlight',
            light: new THREE.SpotLight(0xffffff),
            initialPosition: {x: 0, y: 100, z: -500},
            properties: {
                castShadow: true
            }
        })
    ],
    onCreated: (self) => {
        self.eyes = [];
        self.video = null;

        /**
         * Create actor
         * @param {self} self
         * @param {[Number]} position
         */
        self.createActor = (self, {position}) => {
            const objects = [];

            const sphereGeometry = new THREE.SphereGeometry(35, 100, 100);
            const material = new THREE.MeshStandardMaterial({color: 0xffffff});

            const actress = new THREE.Object3D();
            self.scene.add(actress);
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
            self.eyes.push(objects);
        }

        /**
         * Build video
         * @param {self} self
         * @param {String} path
         */
        self.buildVideo = (self, {src}) => {
            self.video = document.createElement('video');
            self.video.setAttribute('style', 'display: none');
            const source = document.createElement('source');
            source.setAttribute('src', src);
            source.setAttribute('type', 'video/mp4');
            self.video.appendChild(source);
            document.body.appendChild(self.video);
            console.log(self.video);
        }

        /**
         * Build screen
         * @param {self} self
         */
        self.buildScreen = (self) => {
            const geometry = new THREE.BoxGeometry(615, 305, 10);

            const videoTexture = new THREE.VideoTexture(self.video);
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

            self.scene.add(mesh);

            self.video.play();
        }

    },
    onLoaded: (self) => {

        // Light settings
        const spotlight = self.lightManager.getLightByName('spotlight');
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;

        spotlight.shadow.camera.near = 500;
        spotlight.shadow.camera.far = 4000;
        spotlight.shadow.camera.fov = 30;

        // Create actors
        self.createActor(self, {position: [1200, 270]});
        self.createActor(self, {position: [-1200, 270]});

        // Create cinema screen
        self.buildVideo(self, {src: '/video/cinema-vid.mp4'});
        self.buildScreen(self);

    },
    onUpdate: (self) => {
        self.eyes.forEach((objects) => {
            objects.forEach((item) => {
                item.rotation.y += 0.02;
            });
        });
    }
})
