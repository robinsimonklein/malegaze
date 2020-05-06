import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import Light from "../../light/Light";
import Sound from "../../sound/Sound";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import MobileOrientationControls from "../../controls/MobileOrientationControls";
import * as THREE from "three";
import {lineToCurve} from "../../../helpers/Utils";
import {MathUtils} from "three";
import EventManager from "../../../event/EventManager";
import {Vector3} from "three";

export default new Scenery({
    name: 'cameraman_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                focalLength: 24,
                focusDistance: 100,
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 0, y: 0, z: 0},
            settings: {
                alphaOffset: MathUtils.degToRad(180),
                focalLength: 24,
                focusDistance: 120,
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 0, y: 0, z: 0},
            settings: {
                focalLength: 24,
                focusDistance: 300
            },
            debug: true
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 30, y: 30, z: 30},
            settings: {
                focusDistance: 350
            },
        }),
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: {fov: 30, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 0, y: 300, z: 0},
        })
    ],
    controls: null,
    models: [
        new Model({
            name: 'film_set',
            path: 'models/glb/cameraman_scenery.glb',
            type: 'glb'
        }),
        new Model({
            name: 'camera_splines',
            path: 'models/fbx/cameraman/camera_splines.fbx',
            type: 'fbx'
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
    sounds: [
        new Sound({
            name: 'tuto_intro',
            path: 'sound/tuto_intro.mp3',
            isLoop: false,
            volume: 1,
        }),
    ],
    onCreated: (self) => {

        // --------------------- //
        // ATTRIBUTES DEFINITIONS
        // --------------------- //

        // Camera animation
        self.camPosIndex = 0;
        self.cameraCurves = [];
        self.cameraProgres = 0;

        self.sequences = [
            {
                name: 'traveling intro',
                cameraIndex: 0,
                init: (self) => {
                    self.nextSequence(self)
                },
                update: null
            },
            {
                name: 'traveling intro',
                cameraIndex: 0,
                init: null,
                update: (self) => {
                    self.followCurve(self, {
                            curveName: "P0_INTRO",
                            cameraIndex: 0,
                            duration: 10, // 1000
                        },
                        (self) => {
                            self.nextSequence(self)
                        })
                }
            },
            {
                name: 'tuto cadrage',
                cameraIndex: 1,
                init: (self) => {
                    self.cameraManager.setControls(controlsTypes.MOBILE)
                    const cameraPosition = self.cameraCurves.find(curve => curve.name === 'P1_TRAVEL').getPointAt(0)
                    self.cameraManager.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)

                    EventManager.publish('mobile:interaction_set', 'framing')

                    // Start tutorial
                    EventManager.publish('tutorial:display', {
                        title: 'Cadre l\'image',
                        subtitle: 'Oriente la caméra en pivotant le téléphone',
                        icon: 'tutorial_icon_frame.svg',
                        animation: 'orientation',
                    })


                    // On tutorial finished
                    const displayedEvent = EventManager.subscribe('tutorial:displayed', () => {
                        self.sequences[self.currentSequence].ready = true
                        self.nextSequence(self)
                        // Unsubscribe the event
                        displayedEvent.unsubscribe();
                    })
                }
            },
            {
                name: 'cadrage plan 1',
                cameraIndex: 1,
                ready: true,
                init: () => {

                },
                update: (self) => {
                    const sequence = self.sequences[self.currentSequence]

                    // When ready
                    if(!sequence.ready) return

                    self.frameTarget(self, {
                        target: new Vector3(0.1,-0.54, 0.83),
                        threshold: .1,
                        camera: self.cameraManager.camera,
                        onComplete: (self) => {
                            // EventManager.publish('camera:progress_complete')
                            // EventManager.publish('camera:aiming', {distance, threshold: distanceThreshold, aiming: false})
                            self.nextSequence(self)
                        }
                    })

                }
            },
            {
                name: 'tuto traveling',
                cameraIndex: 1,
                init: (self) => {
                    self.cameraManager.controls = null

                    EventManager.publish('mobile:interaction_set', 'traveling')

                    // Start tutorial
                    EventManager.publish('tutorial:display', {
                        title: 'Effectue un traveling',
                        subtitle: 'Utilise le curseur pour lancer le travelling',
                        icon: 'tutorial_icon_traveling.svg',
                    })


                    // On tutorial finished
                    const displayedEvent = EventManager.subscribe('tutorial:displayed', () => {
                        self.sequences[self.currentSequence].ready = true
                        self.nextSequence(self)
                        // Unsubscribe the event
                        displayedEvent.unsubscribe();
                    })
                }
            },
            {
                name: 'traveling plan 1',
                cameraIndex: 1,
                ready: false,
                init: () => {
                    // On tutorial finished
                    const displayedEvent = EventManager.subscribe('tutorial:displayed', () => {
                        // Unsubscribe the event
                        displayedEvent.unsubscribe();
                    })

                    // On tutorial finished
                    const travelingEvent = EventManager.subscribe('mobile:interaction_done', () => {
                        self.sequences[self.currentSequence].ready = true
                        // Unsubscribe the event
                        travelingEvent.unsubscribe();
                    })
                },
                update: (self) => {
                    const sequence = self.sequences[self.currentSequence]

                    // When ready
                    if(!sequence.ready) return

                    self.followCurve(self, {
                            curveName: "P1_TRAVEL",
                            cameraIndex: 1,
                            duration: 500,
                        },
                        (self) => {
                            self.nextSequence(self)
                        })
                }
            },
            {
                name: '',
                cameraIndex: 2,
                init: (self) => {
                    // Reset camera progress
                    EventManager.publish('camera:progress', 0)
                },
                update: (self) => {
                    self.followCurve(self, {
                            curveName: "P2_ZOOM",
                            cameraIndex: 2,
                            duration: 500,
                        },
                        (self) => {
                            self.nextSequence(self)
                        })
                }
            },
            {
                cameraIndex: 4,
                init: (self) => {
                    self.controls = new MobileOrientationControls(self.cameraManager.camera)
                    self.controls.alphaOffset = Math.PI
                },
                update: (self) => {
                    // self.controls.update()
                }
            }
        ]
        self.currentSequence = 0

        // -- METHODS

        /** Go to next sequence */
        self.nextSequence = (self) => {
            if (self.currentSequence >= self.sequences.length) return // No next sequence
            self.currentSequence += 1
            self.cameraManager.changeCamera(self.sequences[self.currentSequence].cameraIndex)
            if(typeof self.sequences[self.currentSequence].init === 'function') self.sequences[self.currentSequence].init(self)
        }


        /** Display curve */
        self.displayCurve = (self, {curve}) => {
            const points = curve.getSpacedPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.LineBasicMaterial({color: 0x00ff00});

            // Create the final object to add to the scene
            let splineObject = new THREE.Line(geometry, material);

            self.scene.add(splineObject)
        }

    },
    onLoaded: (self) => {
        console.log('self', self)

        // self.cameraManager.changeCamera(4)
        // self.cameraManager.controls.object = self.cameraManager.cameraObjects[4].camera

        // ---------------- //
        // Camera curves
        // ---------------- //

        if (self.scene.getObjectByName('camera_splines').children) {
            self.scene.getObjectByName('camera_splines').children.forEach((obj) => {
                if (obj.isLine) {
                    // Convert into curve
                    const curve = lineToCurve(obj)
                    // Add the curve into curves list
                    self.cameraCurves.push(curve)
                }
            })
        }
        // Remove splines from scene
        self.scene.remove(self.scene.getObjectByName('camera_splines'))

        // Display curves
        self.cameraCurves.forEach((curve => {
            self.displayCurve(self, {curve})
        }))

        // Set camera positions
        self.cameraManager.cameras[0].rotation.y = MathUtils.degToRad(-90)

        // ---------------- //
        // Sound
        // ---------------- //

        // Add sound to camera
        self.soundManager.addToCamera(self.cameraManager.camera);
        // self.soundManager.soundObjects[0].sound.play()

        // Fog
        self.scene.fog = new THREE.Fog(0x1d1428, 200, 1000);


        // --- METHODS

        /**
         * Follow the curve with camera
         * @param self
         * @param camera
         * @param callback
         */
        self.followCurve = (self, {curveName, cameraIndex, duration}, callback) => {
            if (self.camPosIndex >= duration) {
                callback(self)
                self.camPosIndex = 0
                return
            }

            const curve = self.cameraCurves.find((curve) => curve.name === curveName)

            const camPos = curve.getPointAt(self.camPosIndex / duration);
            // const camRot = curve.getTangentAt(self.camPosIndex / duration);

            self.cameraManager.cameraObjects[cameraIndex].camera.position.x = (camPos.x)
            self.cameraManager.cameraObjects[cameraIndex].camera.position.y = (camPos.y)
            self.cameraManager.cameraObjects[cameraIndex].camera.position.z = (camPos.z)

            self.camPosIndex += 1
        }

        self.frameTarget = (self, {target, threshold, camera, onComplete}) => {

            const dir = camera.getWorldDirection(new THREE.Vector3(0, 0, 0))
            const distance = dir.distanceTo(target)

            EventManager.publish('camera:aiming', {distance, threshold: threshold, aiming: distance <= threshold})

            if(distance <= threshold) {
                if(self.cameraProgress < 100) {
                    self.cameraProgress += 0.5
                }else{
                    EventManager.publish('camera:progress_complete')
                    EventManager.publish('camera:aiming', {distance, threshold: threshold, aiming: false})
                    onComplete(self)
                }
                EventManager.publish('camera:progress', self.cameraProgress)
            }else {
                self.cameraProgress = 0
                EventManager.publish('camera:progress', self.cameraProgress)
            }
        }

        if(typeof self.sequences[self.currentSequence].init === 'function') self.sequences[self.currentSequence].init(self)
    },
    onUpdate: (self) => {
        if (typeof self.sequences[self.currentSequence].update === 'function') self.sequences[self.currentSequence].update(self)
    }

})
