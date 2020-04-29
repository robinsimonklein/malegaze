<template>
    <div class="camera-overlay">
        <div class="camera-overlay__corner camera-overlay__corner--tl">
            <div v-show="recording" class="camera-overlay__rec">
                <i class="camera-overlay__rec-point"></i>REC
            </div>
        </div>
        <div class="camera-overlay__corner camera-overlay__corner--tr">
            <svg class="camera-overlay__battery" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 512 512" xml:space="preserve"><path class="st0" d="M496 208h-16v-16c0-8.8-7.2-16-16-16h-16v-16c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32v-16h16c8.8 0 16-7.2 16-16v-16h16c8.8 0 16-7.2 16-16v-64c0-8.8-7.2-16-16-16zm-80-16v160H32V160h384v32z"/><path class="st0" d="M64 192h32v128H64zm64 0h32v128h-32zm64 0h32v128h-32zm64 0h32v128h-32z"/></svg>
        </div>
        <div class="camera-overlay__corner camera-overlay__corner--bl">
        </div>
        <div class="camera-overlay__corner camera-overlay__corner--br"></div>
        <div class="camera-overlay__target">
            <div class="camera-overlay__target--left"></div>
            <div class="camera-overlay__target--center"></div>
            <div class="camera-overlay__target--right"></div>
        </div>
        <div class="camera-overlay__progress">
            <div class="camera-overlay__progress-bar" :style="`width: ${progress}%`"></div>
        </div>
        <div class="camera-overlay__settings">
            <span>1/50</span>
            <span>F 2.8</span>
            <span>ISO 800</span>
        </div>
    </div>
</template>

<script>
    import CameraOverlay from "../../../js/three/overlays/CameraOverlay"

    export default {
        name: "CameraOverlay",
        data() {
            return {
                progress: 0,
                recording: false,
                anim: null
            }
        },
        methods: {
            update() {
                this.anim = requestAnimationFrame(this.update)
                this.progress = CameraOverlay.progress
                this.recording = CameraOverlay.recording
            }
        },
        mounted() {
            this.update()
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes rec {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        51% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }

.camera-overlay {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    &__corner {
        position: absolute;
        display: flex;
        height: 20vh;
        width: 30vh;
        padding: 2rem;
        font-family: Arial, sans-serif;
        font-size: 1.5rem;
        font-weight: bold;

        &--tl {
            top: 5vh;
            left: 5vh;
            border-top: 1px solid white;
            border-left: 1px solid white;
            justify-content: flex-start;
            align-items: flex-start;
        }
        &--tr {
            top: 5vh;
            right: 5vh;
            border-top: 1px solid white;
            border-right: 1px solid white;
            justify-content: flex-end;
            align-items: flex-start;
        }
        &--bl {
            bottom: 5vh;
            left: 5vh;
            border-bottom: 1px solid white;
            border-left: 1px solid white;
            flex-direction: column;
            justify-content: flex-end;
        }
        &--br {
            bottom: 5vh;
            right: 5vh;
            border-bottom: 1px solid white;
            border-right: 1px solid white;
        }
    }

    &__target {
        position: absolute;
        display: flex;
        justify-content: space-between;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 25vw;
        height: 15vw;

        &--left {
            width: 30%;
            height: 100%;
            border-left: 1px solid white;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
        }

        &--center {
            flex: 1;
            height: 100%;
            &:before {
                content: '';
                position: absolute;
                top: 50%;
                left: calc(50% - .5rem);
                height: 1px;
                width: 1rem;
                background: white
            }
            &:after {
                content: '';
                position: absolute;
                top: calc(50% - .5rem);
                left: 50%;
                height: 1rem;
                width: 1px;
                background: white
            }
        }

        &--right {
            width: 30%;
            height: 100%;
            border-right: 1px solid white;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
        }
    }

    &__progress {
        position: absolute;
        top: 5vh;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid rgba(white, .5);
        height: 1rem;
        width: 40vw;

        &-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: green;
            transition: width .2s linear;
        }

    }

    &__settings {
        position: absolute;
        display: flex;
        justify-content: space-around;
        padding: 0 30vh;
        bottom: calc(5vh + 2rem);
        width: 100%;
        font-family: Arial, sans-serif;
        font-size: 1.7rem;
    }

    &__rec {
        display: inline-flex;
        align-items: center;
        color: #dd2e2e;
        font-family: Arial, sans-serif;
        font-weight: bold;
        font-size: 2.2rem;

        &-point {
            height: 2.2rem;
            width: 2.2rem;
            margin-right: .7rem;
            border-radius: 100%;
            background-color: #dd2e2e;

            animation: rec 2s infinite; // TODO
        }
    }

    &__battery {
        fill: white;
        height: 3rem;
    }

}
</style>
