<template>
    <div class="cameraman-ui">
        <!--
        <div class="cameraman-ui__subtitles cameraman-ui__subtitles--fullscreen">
            <span class="cameraman-ui__subtitles-text" v-html="subtitles[currentSubtitle]"></span>
        </div>
        -->
        <DesktopTutorial/>
        <CameraOverlay />
    </div>
</template>

<script>
    import CameraOverlay from "./CameraOverlay";
    import DesktopTutorial from "../DesktopTutorial";

    export default {
        name: "CameramanUI",
        components: {DesktopTutorial, CameraOverlay},
        data() {
            return {
                currentSubtitle: 0,
                subtitles: [
                    '&#171;&nbsp;Eh, on a besoin de toi pour filmer cette dernière scène de rencontre entre l’agent et la fille de l’ambassadeur.&nbsp;&#187;',
                    '&#171;&nbsp;Je sais que t’es nouveau dans le métier mais ne t’inquiète pas, t’as juste à suivre mes conseils…&nbsp;&#187;',
                    '&#171;&nbsp;Et franchement, vu le physique de l’actrice qu’on a dégoté, ça sera du gâteau&nbsp;!&nbsp;&#187;',
                ],
            }
        },
        methods: {
            nextText(){
                if(this.subtitles.length > this.currentSubtitle) this.currentSubtitle += 1
            }
        },
        mounted() {
            // FIXME Utiliser autre chose que des setTimeOut comme ça
            setTimeout(this.nextText, 5000)
            setTimeout(this.nextText, 10000)
        }
    }
</script>

<style lang="scss" scoped>
    .cameraman-ui {
        &__subtitles {
            &-text {
                color: white;
                font-size: 1.875rem;
                font-weight: bold;
                text-shadow: 0 0 1rem rgba(black, .8);
                text-align: center;

            }

            &--fullscreen {
                z-index: 200;
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                padding: 0 10vw;
                background: black;

                .cameraman-ui__subtitles-text {
                    max-width: 1050px;
                }
            }
        }
    }
</style>
