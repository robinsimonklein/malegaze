import CameraManager from '../camera/CameraManager';
import ModelManager from '../model/ModelManager';
import LightManager from '../light/LightManager';
import SoundManager from "../sound/SoundManager";

/**
 * A {@link Scenery} defines all the contents that needs to be rendered in the 3D View of a scenery.
 *
 * @example
 * new Scenery({
 *     name: 'my_scenery',
 *     cameras: [
 *         new Camera({
 *              type: cameraTypes.PERSPECTIVE,
 *              properties: { fov: 1, aspectRatio: window.innerWidth / window.innerHeight, near: 1, far: 4000 },
 *              initialPosition: {x: -50, y: 150, z: -300}
 *         }),
 *         // ...
 *     ],
 *     controls: controlsTypes.MOBILE,
 *     models: [
 *         new Model({
 *             name: 'film_set',
 *             path: 'models/glb/my_scenery.glb',
 *             type: modelTypes.GLB
 *         }),
 *         // ...
 *     ],
 *     lights: [
 *         new Light({
 *             name: 'ambiant',
 *             light: new THREE.HemisphereLight(0xffb8c6, 0x080820),
 *             initialPosition: {x: 0, y: 300, z: 0}
 *         }),
 *         // ...
 *     ],
 *     onCreated: (self) => { // Don't forget self :)
 *         // Add your code here
 *     },
 *     onLoaded: (self) => { // Don't forget self :)
 *         // Add your code here
 *     },
 *     onUpdate: (self) => { // Don't forget self :)
 *         // Add your code here
 *     },
 *
 * })
 */
class Scenery {
    name;
    scene;

    cameraManager;
    modelManager;
    audioManager;
    lightManager;
    soundManager;
    onCreated;
    onLoaded;
    onUpdate;

    /**
     * Create a new Scenery
     * @param {string} name - The name of the scenery
     * @param {Camera[]} cameras - An array of cameras
     * @param {controlsTypes} controls - Controls mode used in the scenery
     * @param {Model[]} models - An array of models that have to be loaded in the scenery
     * @param {Light[]} lights - An array of light
     * @param {Function} onCreated - All the logic that needs to be triggered when the {@link Scenery} is created
     * @param {Function} onLoaded - All the logic that needs to be triggered when the {@link Scenery} is loaded into the Three.js scene and displayed for the first time
     * @param {Function} onUpdate - All the logic that needs to be triggered when the {@link Scenery} is updated
     */
    constructor({
        name = "undefined",
        cameras,
        controls = null,
        models,
        lights,
        onCreated = (self) => self,
        onLoaded = (self) => self,
        onUpdate = (self) => self

    }) {
        this.name = name;

        this.buildCameras(cameras, controls);
        this.buildModels(models);
        this.buildLights(lights);
        this.buildSounds(sounds);

        if (onCreated !== undefined) {
            this.onCreated = onCreated;
            this.onCreated(this);
        }
        if (onLoaded !== undefined) {
            this.onLoaded = onLoaded;
        }
        if (onUpdate !== undefined) {
            this.onUpdate = onUpdate;
        }
    }

    /**
     * Build cameras and cameraManager
     * @param {Camera[]} cameras
     * @param {controlsTypes} controls
     * @private
     */
    buildCameras(cameras, controls) {
        this.cameraManager = new CameraManager({cameras, controls});
    }

    /**
     * Build models and modelManager
     * @param {Model[]} models
     * @private
     */
    buildModels(models) {
        this.modelManager = new ModelManager({models});
    }

    /**
     * Build lights and lightManager
     * @param {Light[]} lights
     * @private
     */
    buildLights(lights) {
        this.lightManager = new LightManager({lights});
    }

    /**
     * Build sounds and soundManager
     * @param {{Sound}} sounds
     */
    buildSounds(sounds) {
        this.soundManager = new SoundManager({sounds});
    }

    /**
     * Add elements to scene
     * @param scene
     */
    addToScene(scene) {
        // Add cameras to scene
        if (this.cameraManager) {
            this.cameraManager.addToScene(scene);
        }
        // Add models to scene
        if (this.modelManager) {
            this.modelManager.addToScene(scene);
        }
        // Add lights to scene
        if (this.lightManager) {
            this.lightManager.addToScene(scene);
        }

     /*   if(this.soundManager) {
            this.soundManager.addToScene(scene)
        }*/

        // Run onLoaded when scenery is added to scene
        this.onLoaded(this);
    }

    /**
     * Update loop
     */
    update() {
        // Run the scenery's onUpdate method
        if (this.onUpdate) {
            this.onUpdate(this);
        }

        // Run managers update loops
        if (this.cameraManager) {
            this.cameraManager.update();
        }
        if (this.modelManager) {
            this.modelManager.update();
        }
        if (this.lightManager) {
            this.lightManager.update();
        }
        if (this.audioManager) {
            this.audioManager.update();
        }
    }
}

export default Scenery;
