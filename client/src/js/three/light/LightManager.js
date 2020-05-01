/**
 * Allows you to manage the different lights of a {@link Scenery}.
 */
class LightManager {

    lightObjects = [];

    /**
     * @param {Light[]} lights - Array of the lights
     * @param {boolean} [debug=false] - Enable/disable debug mode
     */
    constructor({lights, debug = false}) { // eslint-disable-line
        if (lights) {
            lights.forEach((light) => {
                this.lightObjects.push(light);
            });
        }

        if (debug) {
            this.buildHelpers();
        }
    }

    // --- GETTERS

    /**
     * Get an array of Three.js lights
     * @returns {Array}
     */
    get lights() {
        let lights = [];
        this.lightObjects.forEach((lightObject) => {
            lights.push(lightObject.light);
        });
        return lights;
    }

    /**
     * Get light object by index
     * @param {number} index - Index of the light in {@link LightManager}
     * @returns {Light}
     */
    getLightObjectByIndex(index) {
        if (!(this.lightObjects.length > 0)) {
            return null;
        }
        return this.lightObjects[index] ?? null;
    }

    /**
     * Get THREE light by index
     * @param {number} index - Index of the light
     * @returns {THREE.Light}
     */
    getLightByIndex(index) {
        return this.getLightObjectByIndex(index).light ?? null;
    }

    /**
     * Get light object by name
     * @param {string} name - Name of the light
     * @returns {Light}
     */
    getLightObjectByName(name) {
        if (!(this.lightObjects.length > 0)) {
            return null;
        }

        let lightObject = this.lightObjects.find((lightObject) => {
            return lightObject.name === name;
        });

        return lightObject ?? null;
    }

    /**
     * Get THREE light by name
     * @param {string} name - Name of the light
     * @returns {THREE.Light}
     */
    getLightByName(name) {
        return this.getLightObjectByName(name).light ?? null;
    }

    // --- METHODS

    /**
     * Build light helpers
     * @private
     */
    buildHelpers() {
        // TODO: build light helpers
    }

    /**
     * Add lights to scene
     * @param {THREE.Scene} scene - The scene in which we want to add the {@link LightManager} lights
     */
    addToScene(scene) {
        this.lights.forEach((light) => {
            scene.add(light);
        });
    }

    /**
     * Update loop
     */
    update() {
        if (this.lightObjects.length > 0) {
            this.lightObjects.forEach((lightObject) => {
                lightObject.update();
            });
        }
    }
}

export default LightManager;
