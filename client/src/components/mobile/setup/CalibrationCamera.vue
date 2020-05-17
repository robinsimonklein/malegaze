<template>
    <div class="calibration-camera">
        <div class="calibration-camera__overlay" :class="{'visible' : calibrationSuccess}">
            <div class="border top-left">
                <span></span>
                <span></span>
            </div>
            <div class="border top-right">
                <span></span>
                <span></span>
            </div>
            <div class="border bottom-left">
                <span></span>
                <span></span>
            </div>
            <div class="border bottom-right">
                <span></span>
                <span></span>
            </div>
            <div class="center-aim">
                <div class="border top-left">
                    <span></span>
                    <span></span>
                </div>
                <div class="border top-right">
                    <span></span>
                    <span></span>
                </div>
                <div class="border bottom-left">
                    <span></span>
                    <span></span>
                </div>
                <div class="border bottom-right">
                    <span></span>
                    <span></span>
                </div>
                <div class="center">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <OrientationPermissionButton
                    class="calibration-camera__button"
                    v-on:success="onOrientationRequestSuccess"
                    v-on:fail="onOrientationRequestFail"
                    text="Commencer"
            />
            <p class="calibration-camera__overlay__instruction">Visez l'écran</p>
        </div>
        <!-- Camera view -->
        <video id="calibration-camera__view" class="calibration-camera__view" ref="cameraView" autoplay
               playsinline></video>

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
                        width: {ideal: 1920},
                        height: {ideal: 1080}
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
                    .catch(function (error) {
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
            },

        },
        computed: {
            calibrationSuccess() {
                const nbPurple = this.trackedColors.filter(tracked => tracked.color === 'purple').length
                const nbRed = this.trackedColors.filter(tracked => tracked.color === 'red').length

                return nbPurple >= 1 && nbRed >= 1
            }
        },


        mounted() {
            window.tracking.ColorTracker.registerColor('red', (r, g, b) => {
                return r > 180 && g < 80 && b < 80;
            });
            window.tracking.ColorTracker.registerColor('purple', (r, g, b) => {
                return r > 40 && r < 130 && g > 40 && g < 130 && b > 100;
            });

            this.startCamera()

            let colors = new window.tracking.ColorTracker(['purple', 'red']);
            colors.setMinDimension(1)

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
            display: none !important;
            -webkit-appearance: none;;
        }

        &__view::-webkit-media-controls-panel {
            display: none !important;
            -webkit-appearance: none;
        }

        &__view::--webkit-media-controls-play-button {
            display: none !important;
            -webkit-appearance: none;
        }

        &__overlay {
            position: fixed;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            z-index: 100;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
            // box-shadow: none;
            // transition: all 0.5s ease;

            .border {
                position: absolute;
                left: 20px;
                top: 20px;

                span {
                    background: white;
                    width: 2px;
                    height: 30px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    transform-origin: top right;

                    &:last-of-type {
                        transform: rotate(-90deg);
                    }
                }

                &.top-right {
                    left: initial;
                    right: 20px;
                    transform: rotate(90deg);
                }

                &.bottom-right {
                    top: initial;
                    left: initial;
                    right: 20px;
                    bottom: 20px;
                    transform: rotate(180deg);
                }

                &.bottom-left {
                    top: initial;
                    bottom: 20px;
                    transform: rotate(270deg);
                }
            }

            .center-aim {
                position: absolute;
                top: 40%;
                left: 25%;
                width: 50%;
                height: 20%;

                .center {
                    position: absolute;
                    left: calc(50% - 1px);
                    top: calc(50% - 10px);

                    span {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 2px;
                        height: 20px;
                        background: white;

                        &:last-of-type {
                            transform: rotate(90deg);
                        }
                    }
                }
            }

            button {
                opacity: 0;
                text-transform: uppercase;
                color: #202020;
                border: 1px solid #FF4040;
                background: #FF4040;
                border-radius: 0;
                width: 50vw;
                left: calc(50% - 25vw);
                bottom: 10%;
                position: absolute;
                font-weight: bold;
                padding: 15px 0;
                letter-spacing: 5px;
            }

            &__instruction {
                text-transform: uppercase;
                position: absolute;
                letter-spacing: 5px;
                width: 100%;
                left: 0;
                bottom: 10%;
                text-align: center;
            }

            &.visible {
                .border span {
                    background: $color-success;
                }

                .center span {
                    background: $color-success;
                }

                button {
                    transition: all .5s ease;
                    opacity: 1;
                }

                .calibration-camera__overlay__instruction {
                    display: none;
                }
            }
        }

        /* &__button {
            position: absolute;
            bottom: 1rem;
            right: 1rem;
            background: white;
            color: black;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            transition: all .5s ease;

        } */
    }
</style>
