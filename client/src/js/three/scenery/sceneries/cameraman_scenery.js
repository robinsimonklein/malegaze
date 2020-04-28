import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import Model from "../../model/Model";
import Light from "../../light/Light";
import cameraTypes from "../../camera/cameraTypes";
import controlsTypes from "../../controls/controlsTypes";
import * as THREE from "three";
import MobileControls from "../../controls/MobileControls";

export default new Scenery({
    name: 'cameraman_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.CINEMATIC,
            properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: -50, y: 150, z: -300},
            settings: {
                focusDistance: 350
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
            }
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
    onLoaded: (self) => {
        self.mobileControls = new MobileControls(self.cameraManager.cameraObject)
    },
    onUpdate: (self) => {
        self.mobileControls.update(['focalLength'])
    }

})
