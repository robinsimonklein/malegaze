class SceneryManager{

    sceneries = []
    currentScenery = 0

    scene;

    constructor(sceneries, scene) {
        this.scene = scene

        this.buildSceneries(sceneries)
    }

    // --- GETTERS

    /**
     * Returns the current scenery
     * @returns {Scenery}
     */
    get scenery() {
        return this.sceneries[this.currentScenery]
    }

    // --- METHODS

    buildSceneries(sceneries) {
        sceneries.forEach((scenery) => {
            this.sceneries.push(scenery)
        })
    }

    /**
     * Add scenery to scene
     * @param {Scenery} scenery
     */
    addSceneryToScene(scenery = this.scenery) {
        scenery.addToScene(this.scene)
    }

    /**
     * Update loop
     */
    update() {
        this.scenery.update()
    }

    onWindowResize({width, height}) {

    }

}

export default SceneryManager
