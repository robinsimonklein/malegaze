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

export default new Scenery({
    name: 'cameraman_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                alphaOffset: Math.PI,
                focusDistance: 530
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
    controls: controlsTypes.MOBILE,
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
        self.currentCamera = 0

        self.shoots = [
            {
                cameraIndex: 0,
                targetName: 'ACTRICE'
            },
            {
                cameraIndex: 1,
                targetName: 'ACTRICE'
            },
            {
                cameraIndex: 2,
                targetName: 'ACTRICE'
            }
        ]

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

    },
    onLoaded: (self) => {
        console.log('self', self)
        console.log('ACTRICE', self.scene.getObjectByName('ACTRICE'))

        // Mobile controls
        self.mobileControls = new MobileControls(self.cameraManager.cameraObject)

        // Fog
        self.scene.fog = new THREE.Fog(0xff4444, 300, 1000);

        // --- METHODS

        console.log(self.scene.getObjectByName('ACTRICE'))
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
        self.mobileControls.update(['focalLength'])
        self.raycasterIntersects(self)
    }

})
