import SceneManager from './SceneManager';

class ThreeEntryPoint {
    canvas;
    sceneManager;
    renderAnimation;

    constructor() {
        this.createCanvas(document)
        this.sceneManager = new SceneManager(this.canvas)
    }

    /**
     * Initiate THREE and run the animation
     * @param {HTMLElement} container
     * @param {String} sceneryName
     */
    init(container, sceneryName) {
        // Add canvas in DOM container
        container.appendChild(this.canvas)

        // Bind all the events
        this.bindEventListeners()

        // Init sceneManager
        this.sceneManager.init()

        // Add current scenery to scene
        this.sceneManager.loadSceneryByName(sceneryName)

        // Start rendering
        this.start()
    }

    /**
     * Create the render canvas
     * @param document
     */
    createCanvas(document){
        this.canvas = document.createElement('canvas')
    }

    /**
     * Bind all the needed events
     */
    bindEventListeners() {
        // Resize event
        window.addEventListener('resize', () => {
            this.resizeCanvas()
        })
        this.resizeCanvas()
    }

    /**
     * Resize canvas
     */
    resizeCanvas() {
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;

        this.sceneManager.onWindowResize();
    }

    /**
     * Render loop
     */
    render() {
        this.renderAnimation= requestAnimationFrame(this.render.bind(this));
        this.sceneManager.update()
    }

    /**
     * Start the rendering animation
     */
    start() {
        this.render()
    }

    /**
     * Stop the rendering animation
     */
    stop() {
        if(this.renderAnimation) cancelAnimationFrame(this.renderAnimation)
        this.renderAnimation = null
    }
}

// Make singleton
const instance = new ThreeEntryPoint()
export default instance
