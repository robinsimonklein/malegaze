import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import Light from "../../light/Light";
import Sound from "../../sound/Sound"
import store from "../../../../store";
import appStates from "../../../appStates";
import * as THREE from "three";
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';
import PositionalSound from "../../sound/PositionalSound";
import EventManager from "../../../event/EventManager";
import gsap from 'gsap'
//import PositionalSound from "../../sound/PositionalSound";

export default new Scenery({
    name: 'actress_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 180, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 3000 },
            initialPosition: {x: 50, y: 180, z: 330},
            settings: {
                alphaOffset: 0
            }
        }),
    ],
    renderer: null,
    controls: controlsTypes.MOBILE,
    models: [
        new Model({
            name: 'actress_scenery_woman',
            path: "models/glb/actress_scenery_woman.glb",
            type: 'gltf',
            castShadow : true,
            receiveShadow : false
        }),
        new Model({
            name: 'actress_scenery_decor',
            path: "models/glb/actress_scenery_decor.glb",
            type: 'gltf',
            castShadow : true,
            receiveShadow : true
        }),
        new Model({
            name: 'hommes_geants',
            path: "models/glb/hommes_geants2.glb",
            type: 'gltf'
        }),
        new Model({
            name: 'eye',
            path: "models/glb/eyeScene2V3.glb",
            type: 'gltf'
        })
    ],
    lights: [
        new Light({
            name: 'directionnal',
            light: new  THREE.DirectionalLight(0xffffff, .1),
            initialPosition: {x: 50, y: 200, z: 350},
        }),
        new Light({
            name: 'pointLight',
            light: new THREE.PointLight(0xFFE5A3, .7, 500),
            initialPosition: {x: 150, y: 150, z: -350},
            debug: false,
            castShadow: false
        }),
        new Light({
            name: 'spotLight',
            light:  new THREE.SpotLight( 0xFFE5BF, .4 ),
            initialPosition: {x: 0, y: 500, z: -250},
            debug: false,
            castShadow: true
        }),

        new Light({
            name: 'pointLight',
            light: new  THREE.PointLight(0xFF73EC, 50, 1000),
            initialPosition: {x: 0, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight2',
            light: new  THREE.PointLight(0xFF73EC, 50, 1000),
            initialPosition: {x: -500, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight3',
            light: new  THREE.PointLight(0xFF73EC, 50, 1000),
            initialPosition: {x: -1000, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight4',
            light: new  THREE.PointLight(0xFF73EC, 50, 1000),
            initialPosition: {x: 500, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight5',
            light: new  THREE.PointLight(0xFF73EC, 50, 1000),
            initialPosition: {x: -1500, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight6',
            light: new  THREE.PointLight(0xFF73EC, 25, 1000),
            initialPosition: {x: -2000, y: 1000, z: -1500},
        }),
    ],
    sounds : [
        new Sound({
            name : 'ambiantSound',
            path : 'sound/ambianceScene2.mp3',
            isLoop : false,
            volume: 0,
        }),
        new Sound({
            name : 'whispering',
            path : 'sound/whispering.mp3',
            isLoop : true,
            volume: 0,
        }),
        new PositionalSound({
            name : 'eyesSound',
            path: 'sound/eyesSound.mp3',
            refDistance: 100,
            volume: 1,
            isLoop: true
        })
    ],
    onLoaded: (self) => {

        self.clickEvent = EventManager.subscribe('actress:click', () => {
            self.shoot();
        });

        var spriteMap = new THREE.TextureLoader().load( "models/images/oeil.png" );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
        self.eyeSprite =  new THREE.Sprite( spriteMaterial );
        self.eyeSprite.scale.set(10, 10, 1);

        self.eyeModel = self.modelManager.getLoadedModelByName('eye').scene;
        self.eyeModel.position.set(0,200,-800);


        self.manSpeed = 0.001;
        self.eyesSpeed = 0.001;

        self.timer = 0;
        self.endingTimer = 0;

        self.whisperingVolume = 0;

        self.soundManager.addToCamera(self.cameraManager.camera);
        self.eyesSound = self.soundManager.getSoundObjectByName('eyesSound');

        self.percent = null;
        self.blur = null;

        self.group = new THREE.Group();
        self.raycaster =  new THREE.Raycaster();

        self.nodepostBlur = new Nodes.NodePostProcessing(self.renderer);
        self.frame = new Nodes.NodeFrame();
        self.clock = new THREE.Clock();

        self.manModel = self.modelManager.getLoadedModelByName('hommes_geants');
        self.manModel.scene.position.set(0,0,-1000);

        self.ambiantSound = self.soundManager.getSoundObjectByName('ambiantSound').sound;
        self.whisperingSound = self.soundManager.getSoundObjectByName('whispering').sound;

        self.smokeTexture = null;
        self.smokeMaterial = null;
        self.smokeGeo = null;
        self.smokeParticles = [];

        self.eyesAnimationFrame = null;

        self.createGUI = () => {
            let gui = new GUI( { name: 'Damp setting' } );
            gui.add( self.blur.radius, 'x', 0, 5 ).step( 0.5 );
            gui.add( self.blur.radius, 'y', 0, 5 ).step( 0.5 );
        };


        self.addBlur = () => {

            var size = self.renderer.getDrawingBufferSize( new THREE.Vector2() );

            self.blur = new Nodes.BlurNode( new Nodes.ScreenNode() );
            self.blur.size = new THREE.Vector2( size.width, size.height );

            self.nodepostBlur.output = self.blur;

            self.blur.radius.x = 0;
            self.blur.radius.y = 0;

        };

        self.generateSmoke = ({initialPosition, interval}, number, opacity, color) => {

            self.smokeTexture = new THREE.TextureLoader().load( "models/images/Smoke.png" );
            self.smokeMaterial = new THREE.MeshLambertMaterial({color: color, opacity: opacity, map: self.smokeTexture, transparent: true});

            self.smokeMaterial.polygonOffset = true;
            self.smokeMaterial.depthTest = true;
            self.smokeGeo = new THREE.PlaneGeometry(300,300);

            for (var p = 0; p < number; p++) {

                self.smokeMaterial.polygonOffsetFactor = p;
                self.smokeMaterial.polygonOffsetUnits = p/10;
                var particle = new THREE.Mesh(self.smokeGeo, self.smokeMaterial);

                particle.position.set(
                    initialPosition.x + self.randomIntFromInterval(interval.minX, interval.maxX),
                    initialPosition.y + self.randomIntFromInterval(interval.minY, interval.maxY),
                    initialPosition.z + self.randomIntFromInterval(interval.minZ, interval.maxZ));
                particle.rotation.z = Math.random() * 360;
                self.scene.add(particle);
                self.smokeParticles.push(particle);
            }
        };

        self.randomIntFromInterval = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        self.menAttraction = () => {
            let menAttractionFrame = requestAnimationFrame(self.menAttraction);

            var numberz = self.manModel.scene.position.z + (self.cameraManager.camera.position.z - self.manModel.scene.position.z) * self.manSpeed;
            var distZ = Math.round(numberz * 1000) / 1000;
            var diffZ = Math.abs( distZ - self.cameraManager.camera.position.z );

            if(diffZ < 10) {
                cancelAnimationFrame(menAttractionFrame);
            } else {
                self.manModel.scene.position.z = distZ;
            }

        };

        self.generateEye = (number) => {

            for(var i = 0; i < number; i++) {
                var x = self.randomIntFromInterval(-150 , 150);
                var y = self.randomIntFromInterval(200 , 250);
                var z = self.randomIntFromInterval(-200 , 50) -800;

                var clonedSprite = self.eyeModel.clone();
                clonedSprite.position.set(x,y,z);
                clonedSprite.indexEye = i;

                self.eyesSound.addToMesh(clonedSprite);

                self.group.add(clonedSprite);
                self.scene.add(self.group)
            }
        };

         self.eyesAttraction = () => {
            self.eyesAnimationFrame  = requestAnimationFrame(self.eyesAttraction);

            self.group.children.forEach((child) => {

                var cameraPosition = self.cameraManager.camera.position;
                var position = child.position;

                child.lookAt(cameraPosition.x, cameraPosition.y, cameraPosition.z);
                var numberz = position.z + (cameraPosition.z - position.z) * self.eyesSpeed;
                var distZ = Math.round(numberz * 1000) / 1000;
                var diffZ = Math.abs( distZ - self.cameraManager.camera.position.z );

                if(diffZ > 150) {
                    position.z = distZ;
                }

            })
        };

        self.endingScene = () => {
            let endingAttractionFrame = requestAnimationFrame(self.endingScene);

            if(self.endingTimer === 1000) {
                cancelAnimationFrame(endingAttractionFrame);
                self.soundManager.stopAll();
                store.dispatch('app/requestState', appStates.SPECTATOR);
            }
            self.endingTimer++;
        };

        self.shoot = () => {
            self.raycaster.setFromCamera({x: 0.0,y: 0.0}, self.cameraManager.camera);
            let intersects = self.raycaster.intersectObjects(self.group.children, true);

            if (intersects.length > 0) {
                if(self.whisperingVolume < 1) {
                    self.whisperingVolume += 0.01;
                    self.whisperingSound.setVolume(self.whisperingVolume);
                }
                intersects.forEach((element) => {
                    var object = element.object.parent;
                    var position = object.position;
                    gsap.to(position, {z: position.z -50 , duration: 1});

                })

            }

        };

        self.playAmbiantSound = () => {
            self.ambiantSound.play();
            self.whisperingSound.play();
            self.eyesSound.sound.play();
        };

        self.timeline = () => {
            var tl = new gsap.timeline();

            var duration = {time : 0}

            tl.to(duration, {
                onComplete: () => {
                    console.log('fade in')
                    EventManager.publish('actress:fadeIn');
                    self.generateLight();
                    self.playAmbiantSound();
                    self.fadeInMusic(self.ambiantSound);
                },

            });


            tl.to(duration, {
                onComplete: () => {
                    console.log('voix actrice');
                },
                delay: 10
            });


            //t.25 s
           tl.to(duration, {
                onComplete: () => {
                    console.log('eyes + voix hommes');
                    self.eyesAttraction();
                },
                delay: 15
            });

            //t.35
            tl.to(duration, {
                onComplete: () => {
                    console.log('statues')
                    self.menAttraction()
                },
                delay : 10
            });


            //t.40
            tl.to(duration, {
                onComplete: () => {
                    console.log('instructions')
                    EventManager.publish('actress:showInstruction');
                },
                delay : 5
            });

            //t. 1.10
            tl.to(duration, {
                onComplete: () => {
                    console.log('blur')
                    self.fadeBlur();
                },
                delay: 40
            });
        };

      /*  self.fadeMusic = (audio1, audio2) => {
            var volume1 = {x: audio1.getVolume()};
            var volume2 = {x: audio2.getVolume()};

            var tl = new gsap.timeline();

            tl.to(volume1, {
                duration: 1,
                x: 0,
                onUpdate: () => {
                    audio1.setVolume(volume1.x)
                },
                onComplete: () => {
                    audio1.stop()
                }
            });

            tl.to(volume2, {
                duration: 1,
                x: 1,
                onUpdate: () => {
                    audio2.setVolume(volume2.x)
                }
            });

        };*/

        self.generateLight = () => {

            //Oui je sais c'est moche
            var womanModel = self.modelManager.getLoadedModelByName('actress_scenery_woman').scene;

            var spotLightTest =  new THREE.SpotLight(0xFFE5BF, .2 );
            spotLightTest.position.set(0,400, 200);
            spotLightTest.target = womanModel.children[0];
            spotLightTest.castShadow = true;
            spotLightTest.shadow.camera.far = 1000      // default
            self.scene.add(spotLightTest);

            /* let spotLightHelper = new THREE.SpotLightHelper( spotLightTest, 10 );
             self.scene.add(spotLightHelper);*/

            self.renderer.shadowMap.autoUpdate = false;
            self.renderer.shadowMap.needsUpdate = true;
        }

        self.fadeInMusic = (sound) => {
            var volume = {x: sound.getVolume()};
            gsap.to(volume, {
                duration: 15,
                x: 1,
                onUpdate: () => {
                    sound.setVolume(volume.x)
                }
            });
        };

        self.fadeBlur = () => {
            var blurValue = {x : self.blur.radius.x , y: self.blur.radius.y};
            gsap.to(blurValue, {
                duration: 25,
                x: 10,
                y: 10,
                onUpdate: () => {
                    self.blur.radius.x = blurValue.x;
                    self.blur.radius.y = blurValue.y;
                },
                onComplete: () => {
                    EventManager.publish('actress:fadeOut');
                    cancelAnimationFrame(self.eyesAnimationFrame);
                    self.endingScene()

                }
            });
        };

        self.generateEye(10);
        //self.initEyeAnimation();

        self.generateSmoke({initialPosition : {x: 0, y: 600, z: -800}, interval : {
                minX : -300,
                maxX : 300,
                minY : 100,
                maxY : 100,
                minZ : -100,
                maxZ : 100
            }}, 50, .2, 0xFF73EC);

        self.generateSmoke({initialPosition : {x: 0, y: 600, z: -1000}, interval : {
                minX : -900,
                maxX : 900,
                minY : 100,
                maxY : 100,
                minZ : -400,
                maxZ : 200
            }}, 100, .1, 0xFF73EC);

        self.generateSmoke({initialPosition : {x: 0, y: 0, z: -400}, interval : {
                minX : -150,
                maxX : 150,
                minY : 100,
                maxY : 300,
                minZ : -550,
                maxZ : 200
            }}, 50, 1, 0x000000);

        self.addBlur();
       // self.createGUI();
        self.timeline();

      //  window.addEventListener('keypress', () => {console.log(self.eyesAttraction())})
        /*-----------------------------TIMELINES OUI-----------------------------------------*/

        //1.placer son dialogue actrice
     /*   setTimeout(() => {
            EventManager.publish('actress:fadeIn');
        },500)

        //2. Ambiance sonore
        setTimeout(() => {
            console.log('ambiant');
            self.playAmbiantSound();
            self.fadeInMusic(self.ambiantSound);
        },2000);*/

        //2. Ambiance sonore
     /*  setTimeout(() => {
           console.log('ambiant')
            self.playAmbiantSound()
           self.fadeInMusic(self.ambiantSound);
        },2000);

        //3. Voix actrice + oeil qui approche t.30s
        setTimeout(() => {
            console.log('eyeAttraction')
            self.eyesAttraction();
            self.fadeMusic(self.ambiantSound, self.ambiantSound2);
        },30000);

        //4. Voix homme t.35
        setTimeout(() => {
            console.log('voix homme')
        },35000);

        //5. Statues qui s'approchent + possibilités de tirer sur les yeux t.40
        setTimeout(() => {
            console.log('menAttraction')
            EventManager.publish('actress:showInstruction');
            self.menAttraction()
        },40000);

        //5. Vision se trouble et début de la dernière bande son t.1min10
        setTimeout(() => {
           console.log('blur')
            self.fadeBlur();
            self.fadeMusic(self.ambiantSound2, self.ambiantSound3);
        },61000);*/


    },


    onUpdate: (self) => {

        var delta = self.clock.getDelta();
        self.frame.update( delta );
        self.nodepostBlur.render(self.scene, self.cameraManager.camera, self.frame);

        /*  var sp = self.smokeParticles.length;
          while(sp--) {
              self.smokeParticles[sp].rotation.z += (delta * 0.2);
          }*/

    }
})
