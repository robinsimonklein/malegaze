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
import EventManager from '../../../event/EventManager';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {BloomPass} from 'three/examples/jsm/postprocessing/BloomPass';
import {FilmPass} from 'three/examples/jsm/postprocessing/FilmPass';
import * as Nodes from 'three/examples/jsm/nodes/Nodes';
import gsap from 'gsap';

export default new Scenery({
    name: `${appStates.SPECTATOR}_scenery`,
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: {fov: 180, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 3500},
            initialPosition: {x: -25, y: 280, z: 730},
            settings: {
                alphaOffset: 0
            }
        })
    ],
    renderer: null,
    controls: controlsTypes.MOBILE,
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
            light: new THREE.HemisphereLight(0xffb8c6, 0x080820, 1)
        }),
        new Light({
            name: 'spotlight',
            type: lightTypes.SPOT,
            light: new THREE.SpotLight(0xff4444),
            initialPosition: {x: 0, y: 100, z: -780},
            properties: {
                penumbra: 0.3,
                angle: 0.7
            }
        })
    ],
    sounds: [
        new Sound({
            name: 'ambiance',
            path: 'sound/spectator/spectator_ambiance.mp3',
            isLoop: true,
            volume: 1
        }),
        new Sound({
            name: 'light_0',
            path: 'sound/spectator/soundLight.mp3',
            isLoop: false,
            volume: .9
        }),
        new Sound({
            name: 'light_1',
            path: 'sound/spectator/soundLight.mp3',
            isLoop: false,
            volume: .9
        }),
        new Sound({
            name: 'light_2',
            path: 'sound/spectator/soundLight.mp3',
            isLoop: false,
            volume: .9
        }),
        new Sound({
            name: 'light_3',
            path: 'sound/spectator/soundLight.mp3',
            isLoop: false,
            volume: .9
        }),
        new Sound({
            name: 'light_4',
            path: 'sound/spectator/soundLight.mp3',
            isLoop: false,
            volume: .9
        }),
        new Sound({
            name: 'light_5',
            path: 'sound/spectator/soundLight.mp3',
            isLoop: false,
            volume: .9
        }),
        new Sound({
            name: 'voice',
            path: 'sound/spectator/voice.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice1',
            path: 'sound/spectator/voice_1.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice2',
            path: 'sound/spectator/voice_2.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice3',
            path: 'sound/spectator/voice_3.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice4',
            path: 'sound/spectator/voice_4.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice5',
            path: 'sound/spectator/voice_5.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice6',
            path: 'sound/spectator/voice_6.mp3',
            isLoop: false,
            volume: 0.9
        }),
        new Sound({
            name: 'voice7',
            path: 'sound/spectator/voice_7.mp3',
            isLoop: false,
            volume: 0.9
        })
    ],
    onCreated: (self) => {
        self.eyeModel = null;
        self.eyes = [];
        self.video = null;
        self.blur = null;

        self.raycaster = new THREE.Raycaster();

        self.volumetricLights = [];
        self.spotLights = [];
        self.spectators = [];
        self.smokeParticles = [];

        self.lightColor = 0xffeeee;

        self.sprites = [
            {
                name: 'spectatrice_gauche',
                soundName: 'voice1',
                needZoom: 2,
                position: new THREE.Vector3(-160,250,600)
            },
            {
                name: 'spectateur_droite',
                soundName: 'voice2',
                needZoom: 2,
                position: new THREE.Vector3(260,250,600)
            },
            {
                name: 'femme_assise_droite',
                soundName: 'voice3',
                needZoom: 5,
                position: new THREE.Vector3(775,120,-500)
            },
            {
                name: 'femme_running_gauche',
                soundName: 'voice4',
                needZoom: 5,
                position: new THREE.Vector3(-800,120,-600)
            },
            {
                name: 'femme_skate_gauche',
                soundName: 'voice5',
                needZoom: 7,
                position: new THREE.Vector3(-800,120,-1400)
            }
        ]
        self.intersectedSprite = null
        self.spritesEnabled = false

        self.replaceConeByCylinder = (mesh) => {
            mesh.material = new THREEx.VolumetricSpotLightMaterial(2.8, 5., mesh.position, new THREE.Color(self.lightColor), 1.);
            mesh.material.visible = false;
            mesh.geometry = new THREE.CylinderGeometry(18., 200., 300, 32 * 2, 20, true);
            mesh.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 50, 0));

            const spotLight = new THREE.SpotLight(new THREE.Color(self.lightColor), 0., 0., 0.9, 0.5, 0.5);
            spotLight.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
            spotLight.target.position.set(mesh.position.x, 0, mesh.position.z);

            self.spotLights.push(spotLight);
            self.spotLights.push(spotLight.target);
            self.scene.add(spotLight);
            self.scene.add(spotLight.target);
        }

        self.spriteListener = (self) => {
            self.raycaster.setFromCamera({x: 0.0, y: 0.0}, self.cameraManager.camera);
            const intersects = self.raycaster.intersectObjects(self.scene.getObjectByName('sprites').children, false);

            if(intersects.length > 0) {
                if(self.intersectedSprite !== intersects[0].object){
                    self.intersectedSprite = intersects[0].object
                    gsap.to(self.intersectedSprite.scale, {duration: .5, ease: 'power2.out', x: .1, y: .1, z: .1})
                    EventManager.publish('mobile:interaction_set', 'listen')
                    EventManager.publish('spectatorDetected');
                }
            }
            else{
                // Check if all sounds
                if(self.intersectedSprite !== null) {
                    gsap.to(self.intersectedSprite.scale, {duration: .5, ease: 'power2.out', x: .07, y: .07, z: .07})
                    self.intersectedSprite = null
                    EventManager.publish('mobile:interaction_set', null)
                    EventManager.publish('spectatorNotDetected');
                }
            }
        }

        self.endScene = () => {
            self.source.src = '/video/cinema-vid-end.mp4';
            self.cameraManager.controls = null;
            const timeline = gsap.timeline();
            timeline.to(self.cameraManager.camera.rotation, {x: -0.01, y: 0, z:0, duration: 3, ease: 'power1.inOut'})
            timeline.to(self.cameraManager.camera, {delay: 1, zoom: 5, duration: 3, ease: 'power1.inOut'}, '>-1');
            timeline.call(() => {
                EventManager.publish('spectator:fadeout');
                self.video.pause();
                gsap.delayedCall(3, () => { store.dispatch('app/requestState', appStates.END) })
            })
        }

        self.lightUp = (index) => {
            const tl = new gsap.timeline()
            // FIXME : Surement moyen d'optimiser ça
            tl.to(self.volumetricLights[index].material, {duration: .1, visible: true}, )
            tl.to(self.spotLights[index * 2], {duration: .1, intensity: 1}, '<')
            tl.to(self.volumetricLights[index].material, {duration: .1, visible: false})
            tl.to(self.spotLights[index * 2], {duration: .1, intensity: 0}, '<')
            tl.to(self.volumetricLights[index].material, {duration: .1, visible: true})
            tl.to(self.spotLights[index * 2], {duration: .1, intensity: 1}, '<')
            tl.to(self.volumetricLights[index].material, {duration: .1, visible: false})
            tl.to(self.spotLights[index * 2], {duration: .1, intensity: 0}, '<')
            tl.to(self.volumetricLights[index].material, {delay: .4, duration: .1, visible: true})
            tl.to(self.spotLights[index * 2], {duration: .1, intensity: 1}, '<')

            self.soundManager.getSoundByName('light_'+index).play()

            self.eyes[index].forEach((eye, index) => {
                if (index !== 0) {
                    eye.visible = true;
                }
            });
        }

        self.generateFog = (smokePosition, intervals, number, opacity) => {
            const smokeTexture = new THREE.TextureLoader().load('models/images/Smoke.png');
            const smokeMaterial = new THREE.MeshLambertMaterial({
                color: 0xFFFFFF,
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
                    smokePosition.y + self.randomIntFromInterval(intervals.minY, intervals.maxY),
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
            self.source = document.createElement('source');
            self.source.setAttribute('src', src);
            self.source.setAttribute('type', 'video/mp4');
            self.video.appendChild(self.source);
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

            self.videoScreen = mesh;
            self.video.volume = 0.02;
            self.video.play();
        }

        self.addBlur = () => {
            self.composer = new EffectComposer(self.renderer);
            self.composer.addPass(new RenderPass(self.scene, self.cameraManager.camera));

            self.bloomPass = new BloomPass(
                1,
                25,
                0,
                256
            );
            self.composer.addPass(self.bloomPass);

            const filmPass = new FilmPass(
                0.1,
                0.025,
                648,
                0,
            );
            filmPass.renderToScreen = true;
            self.composer.addPass(filmPass);

            const size = self.renderer.getDrawingBufferSize(new THREE.Vector2());

            self.blur = new Nodes.BlurNode(new Nodes.ScreenNode());
            self.blur.size = new THREE.Vector2(size.width, size.height);

            self.nodepostBlur.output = self.blur;

            self.blur.radius.x = 7;
            self.blur.radius.y = 7;
        }


        self.buildSprite = (self, {sprite}) => {
            const spriteObject = new THREE.Sprite(self.spriteMaterial)
            spriteObject.name = sprite.name ?? ''
            spriteObject.soundName = sprite.soundName ?? ''
            spriteObject.needZoom = sprite.needZoom ?? false
            spriteObject.position.set(sprite.position.x, sprite.position.y, sprite.position.z)
            spriteObject.scale.set(.07, .07, .07)
            self.spriteGroup.add(spriteObject)
        }

    },
    onLoaded: (self) => {
        console.log(self)

        self.timer = 0;
        self.clock = new THREE.Clock();

        self.nodepostBlur = new Nodes.NodePostProcessing(self.renderer);
        self.frame = new Nodes.NodeFrame();

        self.lightSound = self.soundManager.getSoundByName('light');

        self.light = new THREE.DirectionalLight(0xffffff, 0);
        self.scene.add(self.light);

        self.soundManager.getSoundByName('ambiance').play();

        self.spriteMap = new THREE.TextureLoader().load( "/png/spectator_sprite.png" );
        self.spriteMaterial = new THREE.SpriteMaterial( { map: self.spriteMap, sizeAttenuation: false, opacity: 0, transparent: true } );
        self.spriteGroup = new THREE.Object3D();
        self.spriteGroup.name = 'sprites'
        self.scene.add(self.spriteGroup)

        // Set street lamp & eyes next to women
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


            if (child.name.toLowerCase().includes('persos')) {
                child.children.forEach((spectator) => {
                    if (spectator.type.toLowerCase() === 'mesh') {
                        self.spectators.push(spectator);
                    } else {
                        spectator.children.forEach((spec) => {
                            if (spec.type.toLowerCase() === 'mesh') {
                                self.spectators.push(spec);
                            }
                        });
                    }
                });
            }
        });

        // Create cinema screen
        self.buildVideo({src: '/video/cinema-vid.mp4'});
        self.buildScreen();

        self.addBlur();

        // Add sprites on spectators & women
        self.sprites.forEach((sprite) => {
            self.buildSprite(self, {sprite})
        })


        self.listenEvent = EventManager.subscribe('mobile:interaction', (interaction) => {
            if(self.intersectedSprite === null || interaction !== 'listen') return

            // Freeze camera
            self.cameraManager.controls = null
            EventManager.publish('mobile:interaction_set', null)
            EventManager.publish('camera:instructions', false)
            self.cameraManager.camera.lookAt(self.intersectedSprite.position)

            const tl = new gsap.timeline()

            tl.to(self.intersectedSprite.material, {duration: 2, ease: 'power3.out', opacity: 0})
            tl.to('.spectatorScene__sight', {duration: 2, ease: 'power3.out', opacity: 0}, '<')
            tl.to(self.cameraManager.camera, {
                duration: 2,
                ease: 'power3.inOut',
                zoom: self.intersectedSprite.needZoom,
                onComplete: () => {
                    const sound = self.soundManager.getSoundByName(self.intersectedSprite.soundName)
                    if(sound) sound.play()
                    sound.source.onended = () => {
                        self.scene.getObjectByName('sprites').remove(self.intersectedSprite)
                        tl.reverse(0).then(() => {
                            self.cameraManager.setControls(controlsTypes.MOBILE)

                            // Check if all voices listened
                            if(self.scene.getObjectByName('sprites').children.length <= 0){
                                gsap.delayedCall(2, () => {
                                    self.endScene()
                                })
                            }
                        })

                    }
                }
            }, '<')

        })

        // Scenery timeline
        // TODO : Loaded before DOM, add setTimeOut to apply on next frame
        setTimeout(() => {
            self.timeline = new gsap.timeline()
            self.timeline.pause()
            self.timeline.call(() => {
                EventManager.publish('spectator:fadein')
            })
            self.timeline.to(self.blur.radius, {duration: 4, delay: 2, x: 0, y: 0})

            // Lights on
            self.timeline.to(self.light, {intensity: 1, duration: 4}, '>15'); // 15
            self.timeline.call(() => {
                self.lightUp(0)
            }, [], '<1')
            self.timeline.call(() => {
                self.lightUp(3)
            }, [], '<1')
            self.timeline.call(() => {
                self.lightUp(4)
            }, [], '<1.4')
            self.timeline.call(() => {
                self.lightUp(1)
            }, [], '<1')
            self.timeline.call(() => {
                self.lightUp(2)
            }, [], '<1.2')
            self.timeline.call(() => {
                self.lightUp(5)
            }, [], '<1.5')


            // Enable interaction
            self.timeline.call(() => {
                self.scene.getObjectByName('sprites').children.forEach((sprite) => {
                    gsap.to(sprite.material, {duration: 3, opacity: 1, ease: 'power3.out'})
                })
                self.spritesEnabled = true
            }, [], '>6')
            self.timeline.to('.spectatorScene__sight', {duration: 2, opacity: 1, ease: 'power3.out'})

            // Tutorial
            self.timeline.call(() => {
                EventManager.publish('camera:instructions', {
                    text: 'Ecoute les personnes autours de toi',
                    icon: 'icon/tutorial/tutorial_icon_listen.svg'
                })
            }, [])

            self.timeline.play();
        }, 0)


    },
    onUpdate: (self) => {
        const delta = self.clock.getDelta();


        self.eyes.forEach((objects) => {
            objects.forEach((item, index) => {
                if (index % 3 === 0) {
                    item.rotation.y += delta;
                }
            });
        });

        if(self.spritesEnabled) self.spriteListener(self)

        /* self.smokeParticles.forEach((particles) => {
            let sp = particles.length;
            while (sp--) {
                particles[sp].rotation.z += (delta * 0.2);
            }
        }); */

        /*
        if (self.timer > 3000) {
            self.smokeParticles.forEach((particles) => {
                let sp = particles.length;
                while (sp--) {
                    if (particles[sp].material.opacity < 0.1) {
                        particles[sp].material.opacity += 0.01;
                    }
                }
            });
        }

         */

        self.composer.render(delta);
        self.frame.update(delta);
        self.nodepostBlur.render(self.scene, self.cameraManager.camera, self.frame);
    }
});
