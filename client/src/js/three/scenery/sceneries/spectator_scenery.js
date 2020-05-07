import Scenery from '../Scenery';
import Camera from '../../camera/Camera';
import Model from '../../model/Model';
import Light from '../../light/Light';
import cameraTypes from '../../camera/cameraTypes';
import controlsTypes from '../../controls/controlsTypes';
import * as THREE from 'three';
import THREEx from '../../light/VolumetricLightMaterial';
import Sound from '../../sound/Sound';
import store from '../../../../store';
import appStates from '../../../appStates';
import modelTypes from "../../model/modelTypes";

export default new Scenery({
    name: 'spectator_scenery',
    orbitControls: null,
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: {fov: 60, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 8000},
            initialPosition: {x: -20, y: 200, z: 390},
        }),
    ],
    renderer: null,
    controls: controlsTypes.ORBIT,
    models: [
        new Model({
            name: 'cinema',
            path: 'models/glb/spectator_scenery.glb',
            type: modelTypes.GLB
        }),
        new Model({
            name: 'cones',
            path: 'models/glb/spectator_scenery_cone.glb',
            type: modelTypes.GLB
        }),
        new Model({
            name: 'eye',
            path: 'models/glb/eye.glb',
            type: modelTypes.GLB
        })
    ],
    lights: [
        new Light({
            name: 'ambient',
            light: new THREE.HemisphereLight(0xffb8c6, 0x080820),
        }),
        /* new Light({
            name: 'directional',
            light: new  THREE.DirectionalLight(0xff4444, 1),
            initialPosition: {x: 0, y: 20, z: 50},
        }), */
        new Light({
            name: 'spotlight',
            light: new THREE.SpotLight(0xff4444),
            initialPosition: {x: 0, y: 100, z: -780},
            properties: {
                castShadow: true,
                penumbra: 0.3,
                angle: 0.7
            }
        }),
    ],
    sounds: [
        new Sound({ // TODO: Son du lampadaire, voix
            name: 'ambiance',
            path: 'sound/ambianceScene3.mp3',
            isLoop: true,
            volume: 0.4,
        }),
    ],
    onCreated: (self) => {
        self.eyeModel = null;
        self.eyes = [];
        self.video = null;
        self.time = 0;
        self.volumetricLights = [];
        self.ghosts = [];

        self.debug = true;

        self.lightColor = 0xffeeee;

        /**
         * @param {*} self
         * @param {*} mesh
         */
        self.replaceConeByCylinder = (self, mesh) => { // TODO: Animer les lampadaires
            mesh.material = new THREEx.VolumetricSpotLightMaterial(2.8, 5., mesh.position, new THREE.Color(self.lightColor), 0.);
            mesh.geometry = new THREE.CylinderGeometry(18., 200., 300, 32 * 2, 20, true);
            mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 50, 0));
        }

        self.lightUp = (self, mesh, eyes) => {
            mesh.material = new THREEx.VolumetricSpotLightMaterial(2.8, 5., mesh.position, new THREE.Color(self.lightColor), 1.);

            const spotLight = new THREE.SpotLight();
            spotLight.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
            spotLight.color = new THREE.Color(self.lightColor);
            spotLight.exponent = 30;
            spotLight.angle = 0.9;
            spotLight.intensity = 1;
            spotLight.decay = 0.5;
            spotLight.penumbra = 0.5;
            spotLight.castShadow = true;
            spotLight.target.position.set(mesh.position.x, 0, mesh.position.z);
            self.scene.add(spotLight);
            self.scene.add(spotLight.target);

            eyes.forEach((eye, index) => {
                if (index !== 0) {
                    eye.visible = true;
                }
            });
        }

        self.generateFog = (self) => { // TODO
            console.log(self.scene);
        }

        /**
         * Create actor
         * @param {*} self
         * @param {number[]} position
         */
        self.createActress = (self, {position}) => {
            const objects = [];

            const material = new THREE.MeshPhongMaterial({opacity: 0});
            material.transparent = true;

            const actress = new THREE.Object3D();
            self.scene.add(actress);
            objects.push(actress);

            actress.position.x = position[0];
            actress.position.y = 100;
            actress.position.z = position[1];

            for (let i = 0; i < 3; i++) {
                const eye = self.eyeModel.clone();
                switch (i) {
                    case 0:
                        eye.rotateZ(Math.PI / 2);
                        eye.position.x = 75;
                        eye.position.y = 70;
                        break;
                    case 1:
                        eye.rotateZ(-Math.PI / 2);
                        eye.position.x = -75;
                        eye.position.y = 70;
                        break;
                    case 2:
                        eye.rotateZ(Math.PI);
                        eye.position.z = 75;
                        break;
                }
                actress.add(eye);
                objects.push(eye);
            }
            self.eyes.push(objects);
        }

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

            self.video.volume = 0;
            self.video.play();
        }

    },
    onLoaded: (self) => {
        // Light settings
        const spotlight = self.lightManager.getLightByName('spotlight');
        spotlight.shadow.mapSize.width = 1024;
        spotlight.shadow.mapSize.height = 1024;

        self.soundManager.addToCamera(self.cameraManager.camera);
        if (!self.debug) {
            self.soundManager.sound.play();
        } else {
            window.addEventListener('keypress', () => self.soundManager.sound.play());
        }

        self.scene.traverse((child) => {
            if (child.name === 'eye') {
                child.receiveShadow = true;
                child.castShadow = true;
                child.rotateX(Math.PI / 2);
                child.visible = false;
                self.eyeModel = child;
            }
        });

        let i = 0;
        self.scene.traverse((child) => {
            if (child.name.toLowerCase().includes('cones')) {
                if (i === 0) {
                    i++;
                    return;
                }
                self.volumetricLights.push(child);
                self.replaceConeByCylinder(self, child); // Create lights
                self.createActress(self, {position: [child.position.x, child.position.z]}); // Create eyes
                i++;
            }
        });
        self.volumetricLights.reverse();

        // Create cinema screen
        self.buildVideo(self, {src: '/video/cinema-vid.mp4'});
        self.buildScreen(self);
    },
    onUpdate: (self) => {
        self.eyes.forEach((objects) => {
            objects.forEach((item, index) => {
                if (index % 3 === 0) {
                    item.rotation.y += 0.02;
                }
            });
        });

        switch (self.time) {
            case 1000:
                self.lightUp(self, self.volumetricLights[2], self.eyes[2]);
                self.lightUp(self, self.volumetricLights[3], self.eyes[3]);
                break;
            case 1100:
                self.lightUp(self, self.volumetricLights[0], self.eyes[1]);
                self.lightUp(self, self.volumetricLights[4], self.eyes[5]);
                break;
            case 1200:
                self.lightUp(self, self.volumetricLights[1], self.eyes[0]);
                self.lightUp(self, self.volumetricLights[5], self.eyes[4]);
                break;
            case 4000:
                if (self.debug) {
                    return;
                }
                self.video.pause();
                store.dispatch('app/requestState', appStates.END);
                break;
        }
        if (self.time < 4000) {
            self.time++;
        }
    }
});
