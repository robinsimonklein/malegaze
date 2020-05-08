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
import modelTypes from '../../model/modelTypes';
import lightTypes from '../../light/lightTypes';

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
            type: lightTypes.AMBIENT,
            light: new THREE.HemisphereLight(0xffb8c6, 0x080820),
        }),
        /* new Light({
            name: 'directional',
            type: lightTypes.DIRECTIONAL,
            light: new THREE.DirectionalLight(0xff4444, 0.5),
            initialPosition: {x: 0, y: 0, z: 0},
        }), */
        new Light({
            name: 'spotlight',
            type: lightTypes.SPOT,
            light: new THREE.SpotLight(0xff4444),
            initialPosition: {x: 0, y: 100, z: -780},
            properties: {
                castShadow: true,
                penumbra: 0.3,
                angle: 0.7
            }
        })
    ],
    sounds: [
        new Sound({
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
        self.volumetricLights = [];

        self.debug = true;

        self.spotLights = [];
        self.lightColor = 0xffeeee;

        /**
         * @param {*} mesh
         */
        self.replaceConeByCylinder = (mesh) => {
            mesh.material = new THREEx.VolumetricSpotLightMaterial(2.8, 5., mesh.position, new THREE.Color(self.lightColor), 1.);
            mesh.material.visible = false;
            mesh.geometry = new THREE.CylinderGeometry(18., 200., 300, 32 * 2, 20, true);
            mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 50, 0));

            const spotLight = new THREE.SpotLight(new THREE.Color(self.lightColor), 1., 0., 0.9, 0.5, 0.5);
            spotLight.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
            spotLight.visible = false;
            spotLight.target.position.set(mesh.position.x, 0, mesh.position.z);

            self.spotLights.push(spotLight);
            self.spotLights.push(spotLight.target);
            self.scene.add(spotLight);
            self.scene.add(spotLight.target);

        }

        self.lightUp = (index) => {
            self.volumetricLights[index].material.visible = true;
            self.spotLights[index * 2].visible = true;

            self.eyes[index].forEach((eye, index) => {
                if (index !== 0) {
                    eye.visible = true;
                }
            });
        }

        self.smokeParticles = [];

        self.generateFog = (smokePosition, intervals, number, opacity) => { // TODO
            const smokeTexture = new THREE.TextureLoader().load('models/images/Smoke.png');
            const smokeMaterial = new THREE.MeshLambertMaterial({
                color: 0x444444,
                map: smokeTexture,
                transparent: true,
                opacity: opacity
            });

            smokeMaterial.polygonOffset = true;
            smokeMaterial.depthTest = true;
            const smokeGeo = new THREE.PlaneGeometry(500, 500);

            const particles = [];
            for (let p = 0; p < number; p++) {
                smokeMaterial.polygonOffsetFactor = p;
                smokeMaterial.polygonOffsetUnits = p / 10.;
                const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
                particle.position.set(
                    smokePosition.x + self.randomIntFromInterval(intervals.minX, intervals.maxX),
                    smokePosition.y + self.randomIntFromInterval(100, 200),
                    smokePosition.z + self.randomIntFromInterval(intervals.minZ, intervals.maxZ)
                );
                particle.rotation.z = Math.random() * 360;

                self.scene.add(particle);
                particles.push(particle);
            }

            self.smokeParticles.push(particles);
        }

        self.randomIntFromInterval = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        /**
         * Create actor
         * @param {number[]} position
         */
        self.generateEyes = ({position}) => {
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
         * @param {string} src - Link to the video
         */
        self.buildVideo = ({src}) => {
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
         */
        self.buildScreen = () => {
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

            self.video.play().then(() => self.video.volume = 0);
        }

    },
    onLoaded: (self) => {
        self.timer = 0;
        self.clock = new THREE.Clock();

        if (!self.debug) {
            self.soundManager.sound.play();
        } else {
            window.addEventListener('keypress', () => self.soundManager.sound.play());
        }

        self.scene.traverse((child) => {
            if (child.name === 'eye') {
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
                self.replaceConeByCylinder(child); // Create lights
                self.generateEyes({position: [child.position.x, child.position.z]}); // Create eyes
                i++;
            }
        });

        // Create cinema screen
        self.buildVideo({src: '/video/cinema-vid.mp4'});
        self.buildScreen();
        // self.generateFog({x: 0, y: 0, z: 1000}, {minX: -1000, maxX: 1000, minZ: 0, maxZ: 200}, 20, 1);
        // self.generateFog({x: 0, y: 0, z: 0}, {minX: -1000, maxX: 1000, minZ: 0, maxZ: 200}, 20, 0.3);
    },
    onUpdate: (self) => {
        const delta = self.clock.getDelta();

        self.eyes.forEach((objects) => {
            objects.forEach((item, index) => {
                if (index % 3 === 0) {
                    item.rotation.y += delta * 0.2;
                }
            });
        });

        self.smokeParticles.forEach((particles) => {
            let sp = particles.length;
            while(sp--) {
                particles[sp].position.z += (delta * 0.1);
            }
        });

        if (self.timer === 1000) {
            self.lightUp(2);
            self.lightUp(3);
        }
        if (self.timer === 1050) {
            self.lightUp(1);
            self.lightUp(5);
        }
        if (self.timer === 1100) {
            self.lightUp(0);
            self.lightUp(4);
        }
        if (self.timer === 4000) {
            if (self.debug) {
                return;
            }
            store.dispatch('app/requestState', appStates.END).then(() => self.video.pause());
        }
        if (self.timer < 4000) {
            self.timer++;
        }
    }
});
