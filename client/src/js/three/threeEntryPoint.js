import SceneManager from './SceneManager';
import store from '../../store';
import appStates from "../appStates";

export default (container) => {
    const canvas = createCanvas(document, container);
    const video = document.querySelector('video');
    const videoHasPlayed = false;
    const sceneManager = new SceneManager(canvas, video);
    let renderAnimationFrame = null;

    bindEventListeners();
    render();

    function createCanvas(document, container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas;
    }

    function bindEventListeners() {
        window.onresize = resizeCanvas;
        resizeCanvas();
        window.addEventListener('keypress', () => { // TODO: Charger la vidéo ailleurs
            sceneManager.nextScene();
            if (!videoHasPlayed) {
                video.play().then(() => {
                    self.videoHasPlayed = true;
                    video.pause()
                });
            }
        });

        // TODO : watch déprécié, changer de méthode
        store.watch((state) => state.app.appState, (state) => {
            if(state === appStates.SCENE1 || state === appStates.SCENE2 || state === appStates.SCENE3){
                sceneManager.clearScene()
                return
            }
            stop()
        });
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        sceneManager.onWindowResize();
    }

    function render() {
        renderAnimationFrame = requestAnimationFrame(render);
        sceneManager.update();
    }

    function stop() {
        cancelAnimationFrame(renderAnimationFrame)
    }
}
