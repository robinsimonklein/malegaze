import Scenery from '../Scenery';
import Camera from '../../camera/Camera';
import Model from '../../model/Model';
import Light from '../../light/Light';
import cameraTypes from '../../camera/cameraTypes';
import controlsTypes from '../../controls/controlsTypes';
import * as THREE from 'three';
import THREEx from '../../light/VolumetricLight';
import Sound from '../../sound/Sound';
import store from '../../../../store';
import appStates from '../../../appStates';

export default new Scenery({ // TODO: Overlay
    name: 'spectator_scenery',
    orbitControls: null,
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: {fov: 60, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 8000},
            initialPosition: {x: -20, y: 200, z: 520}, // TODO: Change position
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
            light: new THREE.SpotLight(0xff4444),
            initialPosition: {x: 0, y: 100, z: -780},
            properties: {
                castShadow: true,
                penumbra: 0.3
            }
        }),
    ],
    sounds: [
        new Sound({ // TODO: Son du lampadaire, son des voix
            name: 'ambiance',
            path: 'sound/ambianceScene3.mp3',
            isLoop: true,
            volume: 0.4,
        }),
    ],
    onCreated: (self) => {
        self.eyes = [];
        self.video = null;
        self.time = 0;
        self.volumetricLights = [];

        /**
         * @param {*} self
         * @param position
         */
        self.buildVolumetricLight = (self, position) => { // TODO: Animer les lampadaires
            const lightColor = 0xffaa44;
            const geometry = new THREE.CylinderGeometry(25., 200., 340, 32 * 2, 20, true);

            geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 55, 0));
            geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-0.15));

            const material = new THREEx.VolumetricSpotLightMaterial(4.5, 15., position, new THREE.Color(lightColor), 1.);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(position.x, position.y, position.z);
            mesh.lookAt(new THREE.Vector3(0, 0, 0));
            self.scene.add(mesh);
            self.volumetricLights.push(mesh);

            const spotLight = new THREE.SpotLight();
            spotLight.position.set(position.x, position.y, position.z);
            spotLight.color = new THREE.Color(lightColor);
            spotLight.exponent = 30;
            spotLight.angle = 0.9;
            spotLight.intensity = 1;
            spotLight.decay = 0.5;
            spotLight.penumbra = 0.5;
            spotLight.target.position.set(position.x, 0, position.z);
            self.scene.add(spotLight);
            self.scene.add(spotLight.target);
        }

        /**
         * Create actor
         * @param {*} self
         * @param {number[]} position
         */
        self.createActress = (self, {position}) => {
            const objects = [];

            const sphereGeometry = new THREE.SphereGeometry(20, 100, 100);
            const material = new THREE.MeshPhongMaterial({color: 0xffffff});

            const actress = new THREE.Object3D();
            self.scene.add(actress);
            objects.push(actress);

            actress.position.x = position[0];
            actress.position.y = 100;
            actress.position.z = position[1];

            for (let i = 0; i < 3; i++) {
                const eye = new THREE.Mesh(sphereGeometry, material);
                eye.castShadow = true;
                switch (i) {
                    case 0:
                        eye.position.x = 50;
                        eye.position.y = 100;
                        break;
                    case 1:
                        eye.position.x = -50;
                        eye.position.y = 100;
                        break;
                    case 2:
                        eye.position.x = 100;
                        eye.position.z = 75;
                }
                actress.add(eye);
                objects.push(eye);
            }
            self.eyes.push(objects);
        }

        /* TODO

        self.buildGhost = (self) => {

        } */

        /**
         * Build video
         * @param {*} self
         * @param {string} path
         */
        self.buildVideo = (self, {src}) => {
            self.video = document.createElement('video');
            self.video.setAttribute('style', 'display: none');
            const source = document.createElement('source');
            source.setAttribute('src', src);
            source.setAttribute('type', 'video/mp4');
            self.video.appendChild(source);
            document.body.appendChild(self.video);
        }

        /**
         * Build screen
         * @param {*} self
         */
        self.buildScreen = (self) => {
            const geometry = new THREE.BoxGeometry(615, 330, 10);

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
            mesh.position.y = 268;
            mesh.position.z = -785;

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

        self.soundManager.addToCamera(self.cameraManager.camera);
        window.addEventListener('keypress', () => self.soundManager.sound.play());
        // self.soundManager.sound.play();

        // Create actors
        self.createActress(self, {position: [850, 270]});
        self.createActress(self, {position: [-850, 270]});
        // self.createActress(self, {position: [850, -620]});
        // self.createActress(self, {position: [-850, -620]});
        // self.createActress(self, {position: [850, -1600]});
        // self.createActress(self, {position: [-850, -1600]});

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

        switch (self.time) {
            case 1500:
                self.buildVolumetricLight(self, new THREE.Vector3(860, 95, 200));
                break;
            case 2000:
                self.buildVolumetricLight(self, new THREE.Vector3(-875, 95, 210));
                break;
            case 4000:
                self.video.pause();
                store.dispatch('app/requestState', appStates.END);
                break;
        }
        if (self.time < 4000) {
            self.time++;
        }
    }
})
