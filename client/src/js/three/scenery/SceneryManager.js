/**
 * The {@link SceneryManager} manage the different sceneries of the app.
 */
class SceneryManager {

    scene;
    renderer;
    sceneries = [];
    currentScenery = 0;

    /**
     * @param {Scenery[]} sceneries - Array of the sceneries
     * @param {THREE.Scene} scene - The Three.js scene
     * @param {renderer}
     * @param {boolean} [debug = false]
     */
    constructor({sceneries, scene, renderer = null, debug = false}) { // eslint-disable-line
        this.scene = scene;
        this.renderer = renderer;

        this.addRendererToScene(sceneries);
        this.buildSceneries(sceneries);
    }

    // --- GETTERS

    /**
     * Returns the current {@link scenery}
     * @returns {Scenery}
     */
    get scenery() {
        return this.sceneries[this.currentScenery];
    }

    /**
     * Get {@link Scenery} index by {@link Scenery} name
     * @param {string} name - The {@link Scenery} name
     * @returns {Scenery} - Returns the scenery
     */
    getSceneryIndexByName(name) {
        const index = this.sceneries.findIndex((scenery) => scenery.name === name);
        return index >= 0 ? index : null;
    }

    // --- SETTERS

    /**
     * Set current scenery
     * @param {number} index - Index of the {@link Scenery}
     */
    setCurrentScenery(index){
        this.currentScenery = index;
    }

    // --- METHODS

    /**
     * Build sceneries array
     * @param {Scenery[]} sceneries
     * @private
     */
    buildSceneries(sceneries) {
        sceneries.forEach((scenery) => {
            this.sceneries.push(scenery);
        })
    }

    /**
     * Add scenery to scene
     * @param {Scenery} scenery - The {@link Scenery} to add
     * @param {THREE.Scene} scene - The Three scene
     */
    addSceneryToScene({scenery = this.scenery, scene}) {
        this.scene = scene;
        scenery.scene = scene;
        scenery.addToScene(scene);
    }

    /**
     * Add renderer to scene
     * @param sceneries
     */
    addRendererToScene(sceneries) {
        sceneries.forEach((scenery) => {
            if(scenery.renderer !== undefined) {
                scenery.renderer = this.renderer;
            }
        })
    }

    /**
     * Update loop
     */
    update() {
        this.scenery.update();
    }

    /**
     * On window resize
     * @param {number} width - Window width
     * @param {number} height - Window height
     */
    onWindowResize({width, height}) { // eslint-disable-line

    }

}

export default SceneryManager;
