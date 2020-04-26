import Scenery from "../Scenery";
import Camera from "../../camera/Camera";
import cameraTypes from "../../camera/cameraTypes";

export default new Scenery({
    name: 'spectator_scenery',
    cameras: [
        new Camera({
            type: cameraTypes.PERSPECTIVE,
            properties: { fov: 30, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 1500 },
            initialPosition: {x: 10, y: 10, z: 10},
        }),
    ]
})
