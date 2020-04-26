class SceneryManager{

    sceneries = []
    currentScenery = 0

    scene;

    constructor(sceneries, scene) {
        this.scene = scene

        this.buildSceneries(sceneries)
    }

    /**
     * Returns the current scenery
     * @returns {Scenery}
     */
    get scenery() {
        return this.sceneries[this.currentScenery]
    }

    buildSceneries(sceneries) {
        sceneries.map((scenery) => {
            this.sceneries.push(scenery)
        })
    }

    /**
     * Update loop
     */
    update() {
        this.scenery.update()
    }

}

export default SceneryManager
