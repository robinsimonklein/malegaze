import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import Light from "../../light/Light";
import Sound from "../../sound/Sound";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import * as THREE from "three";
import {lineToCurve} from "../../../helpers/Utils";
import {MathUtils} from "three";
import EventManager from "../../../event/EventManager";
import {Vector3} from "three";
import gsap from 'gsap'

export default new Scenery({
    name: 'cameraman_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                focalLength: 33,
                focusDistance: 100,
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 0, y: 0, z: 0},
            settings: {
                alphaOffset: MathUtils.degToRad(180),
                focalLength: 40,
                focusDistance: 120,
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 0, y: 0, z: 0},
            settings: {
                focalLength: 40,
                focusDistance: 300
            },
        }),
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: {fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500},
            initialPosition: {x: 30, y: 30, z: 30},
            settings: {
                alphaOffset: MathUtils.degToRad(180),
                showFocus: true,
                focalLength: 60,
                focusDistance: 20
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

        self.currentSequence = 0
        self.sequences = [
            // Intro
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

            // Traveling
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
                        icon: 'tutorial_icon_framing.svg',
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
                name: 'cadrage traveling',
                cameraIndex: 1,
                ready: false,
                init: () => {
                    self.sequences[self.currentSequence].ready = true
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
                name: 'traveling',
                cameraIndex: 1,
                ready: false,
                init: () => {
                    // On tutorial finished
                    const displayedEvent = EventManager.subscribe('tutorial:displayed', () => {
                        // Unsubscribe the event
                        displayedEvent.unsubscribe();
                    })

                    // On interaciton done
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
                            duration: 600,
                        },
                        (self) => {
                            self.nextSequence(self)
                        })
                }
            },

            // Zoom
            {
                name: 'cadrage zoom',
                cameraIndex: 2,
                init: () => {
                    EventManager.publish('camera:progress', 0)
                    self.cameraManager.setControls(controlsTypes.MOBILE)
                    const cameraPosition = self.cameraCurves.find(curve => curve.name === 'P2_ZOOM').getPointAt(0)
                    self.cameraManager.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
                    EventManager.publish('mobile:interaction_set', 'framing')

                    self.sequences[self.currentSequence].ready = true
                },
                update: (self) => {
                    const sequence = self.sequences[self.currentSequence]

                    // When ready
                    if(!sequence.ready) return

                    self.frameTarget(self, {
                        target: new Vector3(0.3,0.25, -0.9),
                        threshold: .1,
                        camera: self.cameraManager.camera,
                        onComplete: (self) => {
                            self.nextSequence(self)
                        }
                    })

                }
            },
            {
                name: 'tuto zoom',
                cameraIndex: 2,
                init: (self) => {
                    self.cameraManager.controls = null

                    EventManager.publish('mobile:interaction_set', 'zoom')

                    // Start tutorial
                    EventManager.publish('tutorial:display', {
                        title: 'Effectue un zoom',
                        subtitle: 'UTILISE LE CURSEUR POUR lancer le zoom ',
                        icon: 'tutorial_icon_zoom.svg',
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
                name: 'zoom',
                cameraIndex: 2,
                ready: false,
                init: (self) => {
                    self.cameraManager.controls = null

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
                            curveName: "P2_ZOOM",
                            cameraIndex: 2,
                            duration: 600,
                        },
                        (self) => {
                            self.nextSequence(self)
                        })
                }
            },

            // Rotation
            {
                name: 'cadrage rotation',
                cameraIndex: 3,
                init: () => {
                    EventManager.publish('camera:progress', 0)
                    self.cameraManager.setControls(controlsTypes.MOBILE)
                    const cameraPosition = self.cameraCurves.find(curve => curve.name === 'P3_ROTATION').getPointAt(0)
                    self.cameraManager.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
                    EventManager.publish('mobile:interaction_set', 'framing')

                    self.sequences[self.currentSequence].ready = true
                },
                update: (self) => {
                    const sequence = self.sequences[self.currentSequence]

                    // When ready
                    if(!sequence.ready) return

                    self.frameTarget(self, {
                        target: new Vector3(-0.16,-0.33, 0.9),
                        threshold: .1,
                        camera: self.cameraManager.camera,
                        onComplete: (self) => {
                            self.nextSequence(self)
                        }
                    })

                }
            },
            {
                name: 'tuto rotation',
                cameraIndex: 3,
                init: (self) => {
                    self.cameraManager.controls = null

                    EventManager.publish('mobile:interaction_set', 'rotation')

                    // Start tutorial
                    EventManager.publish('tutorial:display', {
                        title: 'EFFECTUE UNE ROTATION',
                        subtitle: 'PIVOTE LE Téléphone vers la droite pour effectuer une rotation',
                        icon: 'tutorial_icon_rotation.svg',
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
                name: 'rotate',
                cameraIndex: 3,
                ready: false,
                init: (self) => {
                    self.cameraManager.controls = null

                    // On interaction done
                    const travelingEvent = EventManager.subscribe('mobile:interaction_done', () => {
                        self.sequences[self.currentSequence].ready = true

                        gsap.to(self.cameraManager.camera.rotation.x, {})

                        // Unsubscribe the event
                        travelingEvent.unsubscribe();
                    })
                },
            },
        ]

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

        /**
         * Frame target
         * @param self
         * @param target
         * @param threshold
         * @param camera
         * @param onComplete
         */
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
