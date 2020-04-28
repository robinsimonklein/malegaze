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
})
