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
import PositionalSound from "../../sound/PositionalSound";

export default new Scenery({
    name: 'actress_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 180, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 3000 },
            initialPosition: {x: 50, y: 180, z: 330},
        }),
    ],
    controls: controlsTypes.MOBILE,
    models: [
        new Model({
            name: 'actress_scenery',
            path: "models/glb/actress_scenery2.glb",
            type: 'gltf'
        })
    ],
    lights: [
        new Light({
            name: 'directionnal',
            light: new  THREE.DirectionalLight(0xffffff, 1),
            initialPosition: {x: 0, y: 20, z: 50},
        }),
    ],
    sounds : [
        new Sound({
            name : 'ostTest',
            path : 'sound/ostTest.mp3',
            isLoop : true,
            volume: 0.1,
        }),
        new PositionalSound({
            name : 'test',
            path : 'sound/ostTest.mp3',
            refDistance: 100
        })
    ],
  /* onCreated: (self) => {
        self.shoot = () => {

        }
    },*/
   onLoaded: (self) => {

       self.scene.fog = new THREE.Fog(0x1d1428, 250, 1800);
     //self.cameraManager.camera.lookAt(0,200,0)
      self.soundManager.addToCamera(self.cameraManager.camera);
      self.soundManager.sound.play();

       self.group = new THREE.Group();
       self.raycaster =  new THREE.Raycaster();

       var spriteMap = new THREE.TextureLoader().load( "models/images/oeil.png" );
       var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );

       self.eyeSprite =  new THREE.Sprite( spriteMaterial );
       self.eyeSprite.scale.set(10, 10, 1);

       self.randomIntFromInterval = (min, max) => {
           return Math.floor(Math.random() * (max - min + 1) + min);
       };

       self.generateEye = (number) => {

           for(var i = 0; i < number; i++) {
               var x = self.randomIntFromInterval(-100 , 100);
               var y = self.randomIntFromInterval(100 , 350);
               var z = self.randomIntFromInterval(-50 , 50);

               var clonedSprite = self.eyeSprite.clone();
               clonedSprite.position.set(x,y,z);

               self.group.add(clonedSprite);
               self.scene.add(self.group)
           }
       };

       self.eyesAttraction = () => {
           let eyesAttractionFrame = requestAnimationFrame(self.eyesAttraction);

           self.group.children.forEach((child) => {
               var position = child.position;

               var numberx = position.x + (self.cameraManager.camera.position.x - position.x) * 0.005;
               var numbery = position.y + (self.cameraManager.camera.position.y - position.y) * 0.005;
               var numberz = position.z + (self.cameraManager.camera.position.z - position.z) * 0.005;

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
       };

       self.shoot = (self) => {
           self.raycaster.setFromCamera({x: 0.0,y: 0.0}, self.cameraManager.camera);
           let intersects = self.raycaster.intersectObjects(self.group.children);

           if (intersects.length > 0) {
               self.group.remove(intersects[0].object);
               self.generateEye(self.randomIntFromInterval(1, 5));
           }

       };

      // window.addEventListener('keypress', self.eyesAttraction)

       setTimeout(() => {
           self.eyesAttraction()
       },2500);

       self.generateEye(5);
    },


   /* onUpdate: (self) => {

    }*/
})
