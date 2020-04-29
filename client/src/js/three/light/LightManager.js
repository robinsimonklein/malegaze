class LightManager {

    lightObjects = [];

    /**
     * LightManager
     * @param {[Light]} lights
     * @param {Boolean} debug
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
     * Get an array of THREE lights
     * @returns {[]}
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
     * @param {Number} index
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
     * @param {Number} index
     * @returns {*}
     */
    getLightByIndex(index) {
        return this.getLightObjectByIndex(index).light ?? null;
    }

    /**
     * Get light object by name
     * @param {String} name
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
     * @param {String} name
     * @returns {*}
     */
    getLightByName(name) {
        return this.getLightObjectByName(name).light ?? null;
    }

    // --- METHODS

    /**
     * Build light helpers
     */
    buildHelpers() {
        // TODO: build light helpers
    }

    /**
     * Add lights to scene
     * @param scene
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
