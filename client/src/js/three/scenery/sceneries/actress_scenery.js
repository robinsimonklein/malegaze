import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import Light from "../../light/Light";
import Sound from "../../sound/Sound"
/*import store from "../../../../store";
import appStates from "../../../appStates";*/
import * as THREE from "three";
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
/*import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';*/
import * as Nodes from 'three/examples/jsm/nodes/Nodes.js';
//import PositionalSound from "../../sound/PositionalSound";

export default new Scenery({
    name: 'actress_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 180, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 3000 },
            initialPosition: {x: 50, y: 180, z: 330},
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
            path: "models/glb/hommes_geants.glb",
            type: 'gltf'
        })
    ],
    lights: [
        new Light({
            name: 'directionnal',
            light: new  THREE.DirectionalLight(0xffffff, 1),
            initialPosition: {x: 0, y: 20, z: 50},
        }),
        new Light({
            name: 'pointLight',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: 0, y: 800, z: -1100},
        }),
        new Light({
            name: 'pointLight2',
            light: new  THREE.PointLight(0xFF73EC, 10, 1000),
            initialPosition: {x: -500, y: 800, z: -1100},
        })
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
        })
      /*  new PositionalSound({
            name : 'test',
            path : 'sound/ostTest.mp3',
            refDistance: 100
        })*/
    ],
   onLoaded: (self) => {

       self.scene.fog = new THREE.Fog(0x000000, 250, 3000);

       self.timer = 0;
       self.volume = 0;
       self.manSpeed = 0.0005;
       self.whisperingVolume = 0;
       self.ambiantSoundVolume = 0.5;

       self.soundManager.addToCamera(self.cameraManager.camera);
       self.percent = null;
       self.blur = null;

       self.group = new THREE.Group();
       self.raycaster =  new THREE.Raycaster();
       /*var spriteMap = new THREE.TextureLoader().load( "models/images/oeil.png" );
       var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
       self.eyeSprite =  new THREE.Sprite( spriteMaterial );
       self.eyeSprite.scale.set(10, 10, 1);*/

       self.nodepostFade = new Nodes.NodePostProcessing(self.renderer);
       self.nodepostBlur = new Nodes.NodePostProcessing(self.renderer, self.nodepostFade.renderTarget);
       self.frame = new Nodes.NodeFrame();
       self.clock = new THREE.Clock();

       self.manModel = self.modelManager.getLoadedModelByName('hommes_geants');
       self.manModel.scene.children.shift();
       console.log(self.manModel);
       //self.manModel.scene.children[0].viaible = false;

       self.ambiantSound = self.soundManager.getSoundObjectByName('ambiantSound').sound;
       self.whisperingSound = self.soundManager.getSoundObjectByName('whispering').sound;

      self.pointLight = self.lightManager.getLightByName('pointLight');

       let pointLightHelper = new THREE.PointLightHelper( self.pointLight, 10 );
       self.scene.add( pointLightHelper );

       self.pointLight2 = self.lightManager.getLightByName('pointLight2');

       let pointLightHelper2 = new THREE.PointLightHelper( self.pointLight2, 10 );
       self.scene.add( pointLightHelper2 );

       /*self.composer = new EffectComposer(self.renderer);
       self.composer.addPass(new RenderPass(self.scene, self.cameraManager.camera));

       self.afterImagePass = new AfterimagePass();
       self.composer.addPass(self.afterImagePass);*/

       self.createGUI = () => {
           let gui = new GUI( { name: 'Damp setting' } );
           gui.add( self.percent, 'value', 0, 1 ).step( 0.01 );
           gui.add( self.blur.radius, 'x', 0, 5 ).step( 0.5 );
           gui.add( self.blur.radius, 'y', 0, 5 ).step( 0.5 );
       };

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

        self.addBlur = () => {

            var size = self.renderer.getDrawingBufferSize( new THREE.Vector2() );

            self.blur = new Nodes.BlurNode( new Nodes.ScreenNode() );
            self.blur.size = new THREE.Vector2( size.width, size.height );

            self.nodepostBlur.output = self.blur;

            self.blur.radius.x = 0;
            self.blur.radius.y = 0;

        };

       self.randomIntFromInterval = (min, max) => {
           return Math.floor(Math.random() * (max - min + 1) + min);
       };

       self.menAttraction = () => {
          let menAttractionFrame = requestAnimationFrame(self.menAttraction);

           self.manModel.scene.children.forEach((child) => {

               var numberz = child.position.z + (self.cameraManager.camera.position.z - child.position.z) * self.manSpeed;
               var distZ = Math.round(numberz * 1000) / 1000;
               var diffZ = Math.abs( distZ - self.cameraManager.camera.position.z );

               if(diffZ < 600) {
                  cancelAnimationFrame(menAttractionFrame);
                   self.soundManager.stopAll();
                   //store.dispatch('app/requestState', appStates.SPECTATOR)
               } else {
                   child.position.z = distZ;
               }
           })
       };

     /*  self.generateEye = (number) => {

           for(var i = 0; i < number; i++) {
               var x = self.randomIntFromInterval(-100 , 100);
               var y = self.randomIntFromInterval(100 , 350);
               var z = self.randomIntFromInterval(-50 , 50);

               var clonedSprite = self.eyeSprite.clone();
               clonedSprite.position.set(x,y,z);

               self.group.add(clonedSprite);
               self.scene.add(self.group)
           }
       };*/

      /* self.eyesAttraction = () => {
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

               //console.log(diffX, diffY, diffZ);

               if(diffX < 10.5 && diffY < 3.15 && diffZ < 34.2) {
                   cancelAnimationFrame(eyesAttractionFrame);
                   self.soundManager.stopAll();
                   store.dispatch('app/requestState', appStates.SPECTATOR)
               } else {
                   position.x = distX;
                   position.y = distY;
                   position.z = distZ;

               }

           })
       };*/

       self.shoot = (self) => {
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

       };

       self.playAmbiantSound = () => {
           self.ambiantSound.play();
           self.whisperingSound.play();
       };

       window.addEventListener('keypress', () => {self.menAttraction()});

       self.addFade();
       self.addBlur();
      self.createGUI();
    },


    onUpdate: (self) => {

        self.timer = 0;

         if(self.timer === 500) {
            console.log('man attraction')
            self.playAmbiantSound();
            self.menAttraction();
        } else if(self.timer === 1000) {
            console.log('whispering1')
             self.whisperingVolume += 0.15;
            self.whisperingSound.setVolume(self.whisperingVolume)
           // self.whisperingSound.volume
        } else if(self.timer === 2000) {
            console.log('whispering2')
             self.whisperingVolume += 0.30;
             self.whisperingSound.setVolume(self.whisperingVolume)

        } else if(self.timer === 3000) {
             self.whisperingVolume += 0.50;
             self.whisperingSound.setVolume(self.whisperingVolume)
         }
         else if(self.timer === 4000) {
             self.whisperingVolume += 0.60;
             self.whisperingSound.setVolume(self.whisperingVolume)
         }
         else if(self.timer === 5000) {
             console.log('acceleration')
             self.manSpeed = 0.001;
             self.whisperingVolume += 0.70;
             self.ambiantSoundVolume += 0.70;
             self.whisperingSound.setVolume(self.whisperingVolume);
             self.ambiantSound.setVolume(self.ambiantSoundVolume)

             //grand max  self.manSpeed = 0.005;
         }

        var delta = self.clock.getDelta();
        self.frame.update( delta );
        //self.nodepostFade.render(self.scene, self.cameraManager.camera, self.frame);
        self.nodepostBlur.render(self.scene, self.cameraManager.camera, self.frame);

        //self.composer.render();
    }
})
