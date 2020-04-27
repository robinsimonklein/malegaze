class LightManager {

    lightObjects = [];

    constructor({lights, debug = false}) {
        if(lights){
            lights.forEach((light) => {
                this.lightObjects.push(light)
            })
        }

        if(debug) this.buildHelpers();
    }

    // --- GETTERS

    /**
     * Get an array of THREE lights
     * @returns {[]}
     */
    get lights() {
        let lights = []
        this.lightObjects.forEach((lightObject) => {
            lights.push(lightObject.light)
        })
        return lights
    }

    // --- METHODS

    buildHelpers() {
        // TODO: build light helpers
    }

    /**
     * Add lights to scene
     * @param scene
     */
    addToScene(scene) {
        this.lights.forEach((light) => {
            scene.add(light)
        })
    }

    /**
     * Update loop
     */
    update() {
        if(this.lightObjects.length > 0) {
            this.lightObjects.forEach((lightObject) => {
                lightObject.update()
            })
        }
    }
}

export default LightManager
