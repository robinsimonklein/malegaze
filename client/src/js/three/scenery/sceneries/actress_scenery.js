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
            name: 'actress_scenery',
            path: "models/glb/actress_scenery.glb",
            type: 'gltf'
        }),
        new Model({
            name: 'hommes_geants',
            path: "models/glb/hommes_geants2.glb",
            type: 'gltf'
        }),
        new Model({
            name: 'eye',
            path: "models/glb/eye2.glb",
            type: 'gltf'
        })
    ],
    lights: [
        new Light({
            name: 'directionnal',
            light: new  THREE.DirectionalLight(0xffffff, .25),
            initialPosition: {x: 0, y: 0, z: 50},
        }),
        new Light({
            name: 'directionnal',
            light: new  THREE.DirectionalLight(0xffffff, 1),
            initialPosition: {x: 0, y: 0, z: 0},
        }),
        new Light({
            name: 'pointLight',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: 0, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight2',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: -500, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight3',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: -1000, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight4',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: 500, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight5',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: -1500, y: 1000, z: -1500},
        }),
        new Light({
            name: 'pointLight6',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: -2000, y: 1000, z: -1500},
        }),
    ],
    sounds : [
        new Sound({
            name : 'ambiantSound',
            path : 'sound/musicScene2.mp3',
            isLoop : true,
            volume: 0.5,
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

        // self.cameraManager.setControls(controlsTypes.MOBILE)
        // self.cameraManager.controls.alphaOffset = 0

        self.renderer.logarithmicDepthBuffer = true;

        self.clickEvent = EventManager.subscribe('actress:click', () => {
            self.shoot();
        });

        var spriteMap = new THREE.TextureLoader().load( "models/images/oeil.png" );
        var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
        self.eyeSprite =  new THREE.Sprite( spriteMaterial );
        self.eyeSprite.scale.set(10, 10, 1);

        self.manSpeed = 0.001;
        //self.manSpeed = 0.04;
        self.eyesSpeed = 0.0015;

        self.timer = 0;
        self.endingTimer = 0;
        self.volume = 0;
        self.whisperingVolume = 0;
        self.ambiantSoundVolume = 0.5;

        self.soundManager.addToCamera(self.cameraManager.camera);
        self.eyesSound = self.soundManager.getSoundObjectByName('eyesSound');

        self.percent = null;
        self.blur = null;

        self.group = new THREE.Group();
        self.raycaster =  new THREE.Raycaster();

        self.nodepostFade = new Nodes.NodePostProcessing(self.renderer);
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

        /*self.pointLight = self.lightManager.getLightByName('pointLight');
        let pointLightHelper = new THREE.PointLightHelper( self.pointLight, 10 );
        self.scene.add( pointLightHelper );

        self.pointLight2 = self.lightManager.getLightByName('pointLight2');
        let pointLightHelper2 = new THREE.PointLightHelper( self.pointLight2, 10 );
        self.scene.add( pointLightHelper2 );

        self.pointLight3 = self.lightManager.getLightByName('pointLight3');
        let pointLightHelper3 = new THREE.PointLightHelper( self.pointLight3, 10 );
        self.scene.add( pointLightHelper3 );*/

        //hemisphere
        /*  self.hemisphere = self.lightManager.getLightByName('hemisphere');
          var helper = new THREE.HemisphereLightHelper( self.hemisphere, 5 );
          self.scene.add( helper );*/

        self.createGUI = () => {
            let gui = new GUI( { name: 'Damp setting' } );
            gui.add( self.percent, 'value', 0, 1 ).step( 0.1 );
         /*   gui.add( self.blur.radius, 'x', 0, 5 ).step( 0.5 );
            gui.add( self.blur.radius, 'y', 0, 5 ).step( 0.5 );*/
        };


      /*  self.addBlur = () => {

            var size = self.renderer.getDrawingBufferSize( new THREE.Vector2() );

            self.blur = new Nodes.BlurNode( new Nodes.ScreenNode() );
            self.blur.size = new THREE.Vector2( size.width, size.height );

            self.nodepostBlur.output = self.blur;

            self.blur.radius.x = 0;
            self.blur.radius.y = 0;

        };*/

        self.addFade = () => {

            var color = new Nodes.ColorNode(0x000000);
            self.percent = new Nodes.FloatNode(.5);

            var fade = new Nodes.MathNode(
                new Nodes.ScreenNode(),
                color,
                self.percent,
                Nodes.MathNode.MIX
            );

            self.nodepostFade.output = fade;

        };

        self.generateSmoke = ({initialPosition, interval}, number, opacity) => {

            self.smokeTexture = new THREE.TextureLoader().load( "models/images/Smoke.png" );
            self.smokeMaterial = new THREE.MeshLambertMaterial({color: 0xFF73EC, opacity: opacity, map: self.smokeTexture, transparent: true});

            self.smokeMaterial.polygonOffset = true;
            self.smokeMaterial.depthTest = true;
            self.smokeGeo = new THREE.PlaneGeometry(300,300);

            for (var p = 0; p < number; p++) {

                self.smokeMaterial.polygonOffsetFactor = p;
                self.smokeMaterial.polygonOffsetUnits = p/10;
                var particle = new THREE.Mesh(self.smokeGeo, self.smokeMaterial);
                //particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
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

            /*self.manModel.scene.children.forEach((child) => {

                var numberz = child.position.z + (self.cameraManager.camera.position.z - child.position.z) * self.manSpeed;
                var distZ = Math.round(numberz * 1000) / 1000;
                var diffZ = Math.abs( distZ - self.cameraManager.camera.position.z );

                if(diffZ < 600) {
                   cancelAnimationFrame(menAttractionFrame);
                    self.soundManager.stopAll();
                    store.dispatch('app/requestState', appStates.SPECTATOR)
                } else {
                    child.position.z = distZ;
                }
            })*/
        };

        self.generateEye = (number) => {

            for(var i = 0; i < number; i++) {
                var x = self.randomIntFromInterval(-100 , 100);
                var y = self.randomIntFromInterval(100 , 350);
                var z = self.randomIntFromInterval(-50 , 50);

                var clonedSprite = self.eyeSprite.clone();
                clonedSprite.position.set(x,y,z);

                self.eyesSound.addToMesh(clonedSprite);

                self.group.add(clonedSprite);
                self.scene.add(self.group)
            }
        };

        self.eyesAttraction = () => {
            let eyesAttractionFrame = requestAnimationFrame(self.eyesAttraction);

            self.group.children.forEach((child) => {
                var position = child.position;

                var numberx = position.x + (self.cameraManager.camera.position.x - position.x) * self.eyesSpeed;
                var numbery = position.y + (self.cameraManager.camera.position.y - position.y) * self.eyesSpeed;
                var numberz = position.z + (self.cameraManager.camera.position.z - position.z) * self.eyesSpeed;

                var distX = Math.round(numberx * 1000) / 1000;
                var distY = Math.round(numbery * 1000) / 1000;
                var distZ = Math.round(numberz * 1000) / 1000;

                var diffX = Math.abs( distX - self.cameraManager.camera.position.x );
                var diffY = Math.abs( distY - self.cameraManager.camera.position.y );
                var diffZ = Math.abs( distZ - self.cameraManager.camera.position.z );


                if(diffX < 10.5 && diffY < 3.15 && diffZ < 34.2) {
                    cancelAnimationFrame(eyesAttractionFrame);
                    self.clickEvent.unsubscribe();
                    self.endingScene();
                } else {
                    position.x = distX;
                    position.y = distY;
                    position.z = distZ;

                }

            })
        };

        self.endingScene = () => {
            let endingAttractionFrame = requestAnimationFrame(self.endingScene);

            if(self.endingTimer !== 500) {
                self.percent.value += 0.01;
                self.endingTimer++;
            } else {
                cancelAnimationFrame(endingAttractionFrame);
                self.soundManager.stopAll();
                store.dispatch('app/requestState', appStates.SPECTATOR);
            }
        };

        /* self.shoot = (self) => {
             self.raycaster.setFromCamera({x: 0.0,y: 0.0}, self.cameraManager.camera);
             let intersects = self.raycaster.intersectObjects(self.manModel.scene.children, true);

             if (intersects.length > 0) {

                 intersects.forEach((element) => {
                     var object = element.object.parent.parent;
                     var position = element.object.parent.parent.position;
                     if(position.z > -3050) {
                         object.position.set(position.x, position.y, position.z -50);
                     }

                 })
             }

         };*/

        self.shoot = () => {
            self.raycaster.setFromCamera({x: 0.0,y: 0.0}, self.cameraManager.camera);
            let intersects = self.raycaster.intersectObjects(self.group.children);

            if (intersects.length > 0) {
                if(self.whisperingVolume < 1) {
                    self.whisperingVolume += 0.01;
                    self.whisperingSound.setVolume(self.whisperingVolume);
                }
                var position = intersects[0].object.position;
                position.set(
                    position.x + self.randomIntFromInterval(-10,10),
                    position.y + self.randomIntFromInterval(-10,10),
                    position.z - 30
                );
                /*  self.group.remove(intersects[0].object);
                  self.generateEye(self.randomIntFromInterval(1, 2));*/
            }

        };

        self.playAmbiantSound = () => {
            self.ambiantSound.play();
            self.whisperingSound.play();
            self.eyesSound.sound.play();
        };

        window.addEventListener('keypress', () => {self.eyesAttraction()});

        self.generateEye(5);

        self.generateSmoke({initialPosition : {x: 0, y: 600, z: -800}, interval : {
                minX : -300,
                maxX : 300,
                minY : 100,
                maxY : 100,
                minZ : -100,
                maxZ : 100
            }}, 50, .2);

        self.generateSmoke({initialPosition : {x: 0, y: 600, z: -1000}, interval : {
                minX : -900,
                maxX : 900,
                minY : 100,
                maxY : 100,
                minZ : -400,
                maxZ : 200
            }}, 100, .1);

        self.addFade();
        //self.createGUI();

    },


    onUpdate: (self) => {

        self.timer ++;

        if(self.timer === 500) {

            self.eyesAttraction();
            self.playAmbiantSound();
            self.menAttraction();

        } else if(self.timer === 4000) {
            self.generateEye(5);
           /* self.blur.radius.x = .5;
            self.blur.radius.y = .5;*/
        } else if(self.timer === 5000) {

            self.generateEye(5);
            self.ambiantSoundVolume += 0.70;
            self.ambiantSound.setVolume(self.ambiantSoundVolume);

            self.eyesSpeed = 0.005;
           /* self.blur.radius.x = 2;
            self.blur.radius.y = 2;*/
        }

        var delta = self.clock.getDelta();
        self.frame.update( delta );
        self.nodepostFade.render(self.scene, self.cameraManager.camera, self.frame);

        /*  var sp = self.smokeParticles.length;
          while(sp--) {
              self.smokeParticles[sp].rotation.z += (delta * 0.2);
          }*/

        //self.composer.render();
    }
})
