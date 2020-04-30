import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import Light from "../../light/Light";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import * as THREE from "three";
import MobileControls from "../../controls/MobileControls";
import CameraOverlay from "../../overlays/CameraOverlay";
import store from "../../../../store";
import appStates from "../../../appStates";
import MobileOrientationControls from "../../controls/MobileOrientationControls";

export default new Scenery({
    name: 'cameraman_scenery',
    cameras: [
        /*
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 4000 },
            initialPosition: {x: -50, y: 150, z: -300},
        }),

         */
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                focusDistance: 100,
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                alphaOffset: Math.PI,
                focusDistance: 530,
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: 20, y: 20, z: 20},
            settings: {
                focusDistance: 300
            }
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: 30, y: 30, z: 30},
            settings: {
                focusDistance: 350
            },
        }),
    ],
    controls: null,
    models: [
        new Model({
            name: 'film_set',
            path: 'models/glb/cameraman_scenery.glb',
            type: 'gltf'
        }),
    ],
    lights: [
        new Light({
            name: 'ambiant',
            light: new THREE.HemisphereLight(0xffb8c6, 0x080820),
            initialPosition: {x: 0, y: 300, z: 0},
        }),
        new Light({
            name: 'spotlights',
            light: new THREE.DirectionalLight(0xff4444, 1),
            initialPosition: {x: 0, y: 200, z: -700},
            properties: {
                castShadow: true
            }
        }),
    ],
    onCreated: (self) => {
        // Raycaster
        self.raycaster = new THREE.Raycaster()
        self.sequences = [
            {
                cameraIndex: 0,
                update: (self) => {
                    self.followCurve(self, {
                        curve: self.curve1,
                        cameraIndex: 0,
                        duration: 800,
                    },
                    (self) => {
                        self.changeSequence(self, {index: 1})
                        self.controls = new MobileOrientationControls(self.cameraManager.camera)
                        self.controls.alphaOffset = Math.PI
                        self.mobileControls = new MobileControls(self.cameraManager.cameraObject)
                    })
                }
            },
            {
                cameraIndex: 1,
                update: (self) => {
                    self.controls.update()
                    self.mobileControls.update(['focalLength'])
                }
            }
        ]
        self.currentSequence = 0


        // -- METHODS

        /**
         * Go to next camera
         * @param self
         * @return {boolean}
         */
        self.nextCamera = (self) => {
            CameraOverlay.progress = 0
            if(self.cameraManager.cameraObjects[self.currentCamera + 1]){
                console.log('oui')
                return true
            } else {
                return false
            }
        }

        self.changeSequence = (self, {index}) => {
            self.cameraManager.changeCamera(self.sequences[index].cameraIndex)
            self.currentSequence = index
        }

    },
    onLoaded: (self) => {
        console.log('self', self)

        // Mobile controls
        self.mobileControls = new MobileControls(self.cameraManager.cameraObject)

        // Fog
        self.scene.fog = new THREE.Fog(0xff4444, 300, 1000);

        // Create a sine-like wave
        self.curve1 = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -100, 80, -500 ),
            new THREE.Vector3( -100, 80, -230 ),
        ] );


        var points = self.curve1.getPoints( 50 );
        var geometry = new THREE.BufferGeometry().setFromPoints( points );

        var material = new THREE.LineBasicMaterial( { color : 0x0000ff } );

        // Create the final object to add to the scene
        var splineObject = new THREE.Line( geometry, material );

        self.scene.add(splineObject)



        // Camera animation
        self.camPosIndex = 0

        // --- METHODS

        /**
         * Follow the curve with camera
         * @param self
         * @param camera
         * @param callback
         */
        self.followCurve = (self, {curve, cameraIndex, angle, duration}, callback) => {
            if(self.camPosIndex >= duration) {
                console.log('terminé')
                callback(self)
                return
            }

            var camPos = curve.getPoint(self.camPosIndex / duration);
            var camRot = curve.getTangent(self.camPosIndex / duration);

            self.cameraManager.cameraObjects[cameraIndex].camera.position.x = (camPos.x)
            self.cameraManager.cameraObjects[cameraIndex].camera.position.y = (camPos.y)
            self.cameraManager.cameraObjects[cameraIndex].camera.position.z = (camPos.z)

            self.cameraManager.cameraObjects[cameraIndex].camera.rotation.x = 0
            self.cameraManager.cameraObjects[cameraIndex].camera.rotation.y = -Math.PI/2
            self.cameraManager.cameraObjects[cameraIndex].camera.rotation.z = 0

            // self.cameraManager.cameraObjects[cameraIndex].camera.rotation.y -= Math.PI
            // self.cameraManager.cameraObjects[cameraIndex].camera.rotation.x = 0
            // self.cameraManager.cameraObjects[cameraIndex].camera.rotation.z = 0

            self.camPosIndex += 1
        }

        /**
         * Raycaster intersects
         * @param self
         */
        self.raycasterIntersects = (self) => {
            self.raycaster.setFromCamera({x: 0, y: 0}, self.cameraManager.camera)

            let intersect = self.raycaster.intersectObject(self.scene.getObjectByName('ACTRICE'), true);

            // console.log(intersect)
            /*
            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object.name === "ACTRICE"){
                    if (CameraOverlay.progress < 1) CameraOverlay.progress += 0.005
                    if (CameraOverlay.progress >= 1) {
                        if(!self.nextCamera(self)) store.dispatch('app/requestState', appStates.ACTRESS);
                    }
                    return
                }
            }

             */

            CameraOverlay.progress = 0;
        }
    },
    onUpdate: (self) => {
        // self.mobileControls.update(['focalLength'])


        self.sequences[self.currentSequence].update(self)
    }

})
