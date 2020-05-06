import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import Light from "../../light/Light";
import cameraTypes from "../../camera/cameraTypes";
// import controlsTypes from "../../controls/controlsTypes";
import * as THREE from "three";
import MobileControls from "../../controls/MobileControls";
// import store from "../../../../store";
// import appStates from "../../../appStates";
import MobileOrientationControls from "../../controls/MobileOrientationControls";
import controlsTypes from "../../controls/controlsTypes";

export default new Scenery({
    name: 'cameraman_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 4000 },
            initialPosition: {x: -50, y: 150, z: -300},
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                focusDistance: 100,
            },
            debug: true
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                alphaOffset: Math.PI,
                focusDistance: 530,
            },
            debug: true
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
    controls: controlsTypes.ORBIT,
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
            debug: true
        }),
        new Light({
            name: 'spotlights',
            light: new THREE.DirectionalLight(0xff4444, 1),
            initialPosition: {x: 0, y: 200, z: -700},
            properties: {
                castShadow: true
            },
            debug: true
        }),
    ],
    onCreated: (self) => {
        self.sequences = [
            {
                cameraIndex: 1,
                update: (self) => {
                    self.followCurve(self, {
                        curve: self.curve1,
                        cameraIndex: 1,
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

        self.changeSequence = (self, {index}) => {
            // self.cameraManager.changeCamera(self.sequences[index].cameraIndex)
            self.currentSequence = index
        }

        /** Display curve */
        self.displayCurve = (self, {curve}) => {
            const points = curve.getPoints( 50 );
            const geometry = new THREE.BufferGeometry().setFromPoints( points );

            const material = new THREE.LineBasicMaterial( { color : 0x0000ff } );

            // Create the final object to add to the scene
            let splineObject = new THREE.Line( geometry, material );

            self.scene.add(splineObject)
        }

    },
    onLoaded: (self) => {
        console.log('self', self)

        // Mobile controls
        self.mobileControls = new MobileControls(self.cameraManager.cameraObject)

        // Fog
        // self.scene.fog = new THREE.Fog(0x1d1428, 200, 1000);

        // Create a sine-like wave
        self.curve1 = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -100, 80, -500 ),
            new THREE.Vector3( -100, 80, -230 ),
            new THREE.Vector3( -150, 150, -0 )
        ]);

        self.displayCurve(self, {curve: self.curve1})

        // Camera animation
        self.camPosIndex = 0

        // --- METHODS

        /**
         * Follow the curve with camera
         * @param self
         * @param camera
         * @param callback
         */
        self.followCurve = (self, {curve, cameraIndex, duration}, callback) => {
            if(self.camPosIndex >= duration) {
                console.log('terminé')
                callback(self)
                return
            }

            var camPos = curve.getPoint(self.camPosIndex / duration);
            // var camRot = curve.getTangent(self.camPosIndex / duration);

            self.cameraManager.cameraObjects[cameraIndex].camera.position.x = (camPos.x)
            self.cameraManager.cameraObjects[cameraIndex].camera.position.y = (camPos.y)
            self.cameraManager.cameraObjects[cameraIndex].camera.position.z = (camPos.z)

            self.cameraManager.cameraObjects[cameraIndex].camera.rotation.x = 0
            self.cameraManager.cameraObjects[cameraIndex].camera.rotation.y = -Math.PI/2
            self.cameraManager.cameraObjects[cameraIndex].camera.rotation.z = 0

            self.camPosIndex += 1
        }
    },
    onUpdate: (self) => {
        self.sequences[self.currentSequence].update(self)
    }

})
