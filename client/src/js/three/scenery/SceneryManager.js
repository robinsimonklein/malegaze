class SceneryManager {

    scene;

    sceneries = [];
    currentScenery = 0;

    /**
     * SceneryManager
     * @param {[Scenery]} sceneries
     * @param {*} scene
     * @param {Boolean} debug
     */
    constructor({sceneries, scene, debug = false}) { // eslint-disable-line
        this.scene = scene
        this.buildSceneries(sceneries);
    }

    // --- GETTERS

    /**
     * Returns the current scenery
     * @returns {Scenery}
     */
    get scenery() {
        return this.sceneries[this.currentScenery];
    }

    /**
     * Get scenery index by scenery name
     * @param name
     * @returns {any}
     */
    getSceneryIndexByName(name) {
        const index = this.sceneries.findIndex((scenery) => scenery.name === name);
        return index >= 0 ? index : null;
    }

    // --- SETTERS

    /**
     * Set current scenery
     * @param {Number} index
     */
    setCurrentScenery(index){
        this.currentScenery = index;
    }

    // --- METHODS

    /**
     * Build sceneries array
     * @param sceneries
     */
    buildSceneries(sceneries) {
        sceneries.forEach((scenery) => {
            this.sceneries.push(scenery);
        })
    }

    /**
     * Add scenery to scene
     * @param {Scenery} scenery
     * @param {} scene
     */
    addSceneryToScene({scenery = this.scenery, scene}) {
        this.scene = scene;
        scenery.scene = scene;
        scenery.addToScene(scene);
    }

    /**
     * Update loop
     */
    update() {
        this.scenery.update();
    }

    /**
     * On window resize
     * @param width
     * @param height
     */
    onWindowResize({width, height}) { // eslint-disable-line

    }

}

export default SceneryManager;
