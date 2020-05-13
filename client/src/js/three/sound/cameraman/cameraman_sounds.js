import Sound from "../Sound";
import SubtitledSound from "../SubtitledSound";

export default [
    new Sound({
        name: 'cameraman_ambiance',
        path: 'sound/cameraman/cameraman_ambiance.mp3',
        isLoop: true,
        volume: .2,
    }),
    // Real
    new SubtitledSound({
        name: '01_real_intro',
        path: 'sound/cameraman/real/01_real_intro.mp3',
        subtitlesPath: 'subtitles/cameraman/01_real_intro.vtt'
    }),
    new SubtitledSound({
        name: '02_real_intro_traveling',
        path: 'sound/cameraman/real/02_real_intro_traveling.mp3',
        subtitlesPath: 'subtitles/cameraman/02_real_intro_traveling.vtt'
    }),
    new SubtitledSound({
        name: '03_real_transition_traveling',
        path: 'sound/cameraman/real/03_real_transition_traveling.mp3',
        subtitlesPath: 'subtitles/cameraman/03_real_transition_traveling.vtt'
    }),
    new SubtitledSound({
        name: '04_real_cadrage_traveling',
        path: 'sound/cameraman/real/04_real_cadrage_traveling.mp3',
        subtitlesPath: 'subtitles/cameraman/04_real_cadrage_traveling.vtt'
    }),
    new SubtitledSound({
        name: '05_real_traveling',
        path: 'sound/cameraman/real/05_real_traveling.mp3',
        subtitlesPath: 'subtitles/cameraman/05_real_traveling.vtt'
    }),
    new SubtitledSound({
        name: '06_real_traveling_fin',
        path: 'sound/cameraman/real/06_real_traveling_fin.mp3',
        subtitlesPath: 'subtitles/cameraman/06_real_traveling_fin.vtt'
    }),
    new SubtitledSound({
        name: '07_real_zoom',
        path: 'sound/cameraman/real/07_real_zoom.mp3',
        subtitlesPath: 'subtitles/cameraman/07_real_zoom.vtt'
    }),
    new SubtitledSound({
        name: '08_real_zoom_fin',
        path: 'sound/cameraman/real/08_real_zoom_fin.mp3',
        subtitlesPath: 'subtitles/cameraman/08_real_zoom_fin.vtt'
    }),
    new SubtitledSound({
        name: '09_real_transition_rotation',
        path: 'sound/cameraman/real/09_real_transition_rotation.mp3',
        subtitlesPath: 'subtitles/cameraman/09_real_transition_rotation.vtt'
    }),
    new SubtitledSound({
        name: '10_real_rotation',
        path: 'sound/cameraman/real/10_real_rotation.mp3',
        subtitlesPath: 'subtitles/cameraman/10_real_rotation.vtt'
    }),
    new SubtitledSound({
        name: '11_real_rotation_fin',
        path: 'sound/cameraman/real/11_real_rotation_fin.mp3',
        subtitlesPath: 'subtitles/cameraman/11_real_rotation_fin.vtt'
    }),
    new SubtitledSound({
        name: '12_real_fin',
        path: 'sound/cameraman/real/12_real_fin.mp3',
        subtitlesPath: 'subtitles/cameraman/12_real_fin.vtt'
    }),
]
