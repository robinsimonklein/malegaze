import SceneManager from './SceneManager';
import store from '../../store';

export default (container) => {
    const canvas = createCanvas(document, container);
    const video = document.querySelector('video');
    const videoHasPlayed = false;
    const sceneManager = new SceneManager(canvas, video);

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
        store.watch((state) => state.app.appState, () => sceneManager.clearScene());
    }

    function resizeCanvas() {
        canvas.style.width = '100%';
        canvas.style.height = '100%';

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        sceneManager.onWindowResize();
    }

    function render() {
        requestAnimationFrame(render);
        sceneManager.update();
    }
}
