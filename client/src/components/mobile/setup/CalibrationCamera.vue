<template>
    <div class="calibration-camera">
        <div class="calibration-camera__overlay" :class="{'visible' : calibrationSuccess}">
            <OrientationPermissionButton
                    class="calibration-camera__button"
                    v-on:success="onOrientationRequestSuccess"
                    v-on:fail="onOrientationRequestFail"
                    text="Continuer"
            />
        </div>
        <!-- Camera view -->
        <video id="calibration-camera__view" class="calibration-camera__view" ref="cameraView" autoplay playsinline></video>

    </div>
</template>

<script>
    import 'tracking'
    import OrientationPermissionButton from "./OrientationPermissionButton";

    export default {
        name: "CalibrationCamera",
        components: {OrientationPermissionButton},
        data() {
            return {
                trackedColors: [],
                constraints: {
                    video: {
                        facingMode: "environment",
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    },
                    audio: false
                },
                track: null
            }
        },
        methods: {
            startCamera() {
                navigator.mediaDevices
                    .getUserMedia(this.constraints)
                    .then((stream) => {
                        this.track = stream.getTracks()[0];
                        this.$refs.cameraView.srcObject = stream;
                    })
                    .catch(function(error) {
                        console.error("Oops. Something is broken.", error);
                    });
            },
            stopCamera() {
                this.track.stop()
            },
            onOrientationRequestSuccess() {
                this.stopCamera()
                // /!\ Custom event listened in parent component, not socket !
                this.$emit('finish')
            },
            onOrientationRequestFail(error) {
                console.error(error)
            }
        },
        computed: {
            calibrationSuccess() {
                const nbCyan = this.trackedColors.filter(tracked => tracked.color === 'cyan').length
                const nbMagenta = this.trackedColors.filter(tracked => tracked.color === 'magenta').length
                const nbYellow = this.trackedColors.filter(tracked => tracked.color === 'yellow').length

                return nbMagenta >= 1 && nbCyan >= 1 && nbYellow >= 2
            }
        },
        mounted() {
            this.startCamera()

            var colors = new window.tracking.ColorTracker(['magenta', 'yellow', 'cyan']);

            colors.on('track', (event) => {
                if (event.data.length === 0) {
                    this.trackedColors = []
                    // No colors were detected in this frame.
                } else {
                    this.trackedColors = event.data
                }
            });

            window.tracking.track('#calibration-camera__view', colors);
        }
    }
</script>

<style lang="scss" scoped>
.calibration-camera {
    background: black;
    width: 100vw;
    height: 100vh;

    &__view {
        position: fixed;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    &__view::-webkit-media-controls-start-playback-button {
        display: none!important;
        -webkit-appearance: none;;
    }

    &__view::-webkit-media-controls-panel {
        display: none!important;
        -webkit-appearance: none;
    }

    &__view::--webkit-media-controls-play-button {
        display: none!important;
        -webkit-appearance: none;
    }

    &__overlay {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        width: 100%;
        box-shadow: none;
        transition: all 0.5s ease;

        button {
            opacity: 0;
        }

        &.visible {
            transition: all 0.5s ease;
            box-shadow: inset 0 0 9px 7px #14FF5E;

            button {
                transition: all .5s ease;
                opacity: 1;
            }
        }
    }

    &__button {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background: white;
        color: black;
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        transition: all .5s ease;

    }
}
</style>
