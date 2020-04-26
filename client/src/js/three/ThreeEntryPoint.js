import SceneManager from './SceneManager';
import store from '../../store';
import appStates from "../appStates";

class ThreeEntryPoint {
    canvas;
    sceneManager;
    renderAnimation;

    constructor() {

    }

    init(container) {
        this.createCanvas(document, container)
        this.sceneManager = new SceneManager(this.canvas)

        // Bind all the events
        this.bindEventListeners()

        // Start rendering
        this.start()
    }

    /**
     * Create the render canvas
     * @param document
     * @param container
     */
    createCanvas(document, container){
        const canvas = document.createElement('canvas')
        container.appendChild(canvas)
        this.canvas = canvas
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

        // State changing event
        // FIXME : watch déprécié, changer de méthode
        store.watch((state) => state.app.appState, (state) => {
            if(state === appStates.SCENE1 || state === appStates.SCENE2 || state === appStates.SCENE3){
                this.sceneManager.clearScene()
                return
            }
            this.stop()
        });
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
        cancelAnimationFrame(this.renderAnimation)
    }
}

// Make singleton
const instance = new ThreeEntryPoint()
export default instance
