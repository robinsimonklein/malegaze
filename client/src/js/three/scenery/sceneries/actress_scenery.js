import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import Light from "../../light/Light";
import * as THREE from "three";

export default new Scenery({
    name: 'actress_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 60, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 3000 },
            initialPosition: {x: 18, y: 84.9, z: 227.3},
        }),
    ],
    controls: controlsTypes.MOBILE,
    models: [
        new Model({
            name: 'actress_scenery',
            path: "models/glb/actress_scenery.glb",
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
  /* onCreated: (self) => {
        self.shoot = () => {

        }
    },*/
   onLoaded: (self) => {

       self.group = new THREE.Group();
       self.raycaster =  new THREE.Raycaster();

       var spriteMap = new THREE.TextureLoader().load( "models/images/oeil.png" );
       var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );

       self.eyeSprite =  new THREE.Sprite( spriteMaterial );
       self.eyeSprite.scale.set(5, 5, 1);

       self.randomIntFromInterval = (min, max) => {
           return Math.floor(Math.random() * (max - min + 1) + min);
       };

       self.generateEye = (number) => {

           for(var i = 0; i < number; i++) {
               var x = self.randomIntFromInterval(-100 , 100);
               var y = self.randomIntFromInterval(20 , 200);
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

               if(diffX < 0.95 && diffY < 6.7 && diffZ < 13.5) {
                   cancelAnimationFrame(eyesAttractionFrame);
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


       setTimeout(() => {
           self.eyesAttraction()
       },2500);

       self.generateEye(5);
    },


   /* onUpdate: (self) => {

    }*/
})
