import store from '../../../store'

/**
 * Subtitled Sound class, can be used to display subtitles from VTT file with sound.
 */
class SubtitledSound {
    /**
     * @param {string} [name='undefined'] - Name of the sound
     * @param {string} path - Path of the sound file
     * @param {string} subtitlesPath - Path of the VTT subtitles file
     * @param {function} [ended] - Callback when the sound ended
     */
    constructor({name = 'undefined_subtitled_sound', path, subtitlesPath, ended}) {
        this.name = name;
        this.buildAudio(path)
        this.buildTrack(subtitlesPath)

        if(ended) this.ended = ended

        // Load audio
        this.audio.load();

        // Load metadata
        this.audio.addEventListener('loadedmetadata', () => {
            this.buildCues()
        });
    }

    /**
     * Build audio
     * @param path
     * @private
     */
    buildAudio(path) {
        this.audio = document.createElement('audio')
        this.audio.setAttribute('src', path)
        this.audio.style.display = 'none'
        this.audio.controls = false
        this.audio.setAttribute('preload', 'auto');

        this.audio.onended = () => {
            this.hideText()
            if(this.ended !== undefined) this.ended()
        }

        this.audio.addEventListener('timeupdate', () => {
            if(this.track.mode !== 'hidden') {
                this.buildCues()
            }
        })
    }

    /**
     * Build text track
     * @param trackPath
     * @private
     */
    buildTrack(trackPath) {
        this.trackElement = document.createElement('track')
        this.trackElement.setAttribute('default', '')
        this.trackElement.setAttribute('kind', 'subtitles')
        this.trackElement.setAttribute('src', trackPath)

        // Add path to audio
        if(this.audio) this.audio.appendChild(this.trackElement)

        this.track = this.audio.textTracks[0]
        this.track.mode = 'hidden'

    }

    /**
     * Build cues
     * @private
     */
    buildCues() {
        this.cues = this.track.cues;
        this.track.mode = 'hidden'

        this.track.oncuechange = (e) => {
            if(e.target.activeCues.length > 0) {
                const text = e.target.activeCues[0].text
                this.showText(text)
            }else{
                this.hideText()
            }
        }

    }

    /**
     * Show text
     */
    showText(text) {
        store.commit('desktop/setSubtitles', text)
    }

    /**
     * Hide text
     */
    hideText() {
        store.commit('desktop/setSubtitles', null)
    }

    /**
     * Play sound with the subtitles
     */
    play() {
        if(!this.cues) this.buildCues()
        this.track.mode = 'hidden'
        this.audio.play()
    }

    /**
     * Stop sound
     */
    stop() {
        this.audio.stop()
    }

}

export default SubtitledSound
