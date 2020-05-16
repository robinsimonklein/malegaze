<template>
    <div class="camera-overlay" :class="{'aiming' : aiming}">
        <div class="camera-overlay__corner camera-overlay__corner--tl">
        </div>
        <div class="camera-overlay__corner camera-overlay__corner--tr">
            <div v-show="recording" class="camera-overlay__rec">
                <i class="camera-overlay__rec-point"></i>REC
            </div>
        </div>
        <div class="camera-overlay__corner camera-overlay__corner--bl">
            <img class="camera-overlay__corner-element" src="@/assets/svg/battery.svg"/>
        </div>
        <div class="camera-overlay__corner camera-overlay__corner--br">
            <img class="camera-overlay__corner-element" src="@/assets/svg/4K.svg"/>
        </div>
        <div class="camera-overlay__target" :style="`width: ${targetSize.current}px; height: ${targetSize.current}px`">
            <div class="camera-overlay__target--center"></div>
            <div class="camera-overlay__target--corner camera-overlay__target--tl"></div>
            <div class="camera-overlay__target--corner camera-overlay__target--tr"></div>
            <div class="camera-overlay__target--corner camera-overlay__target--bl"></div>
            <div class="camera-overlay__target--corner camera-overlay__target--br"></div>
            <div class="camera-overlay__rotation" :class="{'visible' : rotationVisible}" :style="`transform: translateX(${rotation*100}vw) translateY(-50%);`"></div>
        </div>
        <div class="camera-overlay__instructions">
            <img class="camera-overlay__instructions-icon" :src="instructions.icon">
            <p class="camera-overlay__instructions-text"> {{ instructions.text }}</p>
        </div>
        <div class="camera-overlay__progress" :class="{'visible' : progressVisible}">
            <div class="camera-overlay__progress-bar" :style="`width: ${progress}%`"></div>
        </div>

        <div class="camera-overlay__black-screen"></div>
        <div class="camera-overlay__black-screen--off"></div>
    </div>
</template>

<script>
    import EventManager from "../../../js/event/EventManager";
    import gsap from 'gsap'

    export default {
        name: "CameraOverlay",
        data() {
            return {
                started: false,
                progress: 0,
                recording: false,
                aiming: false,
                progressVisible: false,
                rotation: 0,
                rotationVisible: false,

                instructions: {
                    text: '',
                    icon: null
                },

                targetSize: {
                    min: 100,
                    max: 200,
                    current: 200
                },

                timelines: {
                    start: new gsap.timeline({
                        onComplete: () => {
                            EventManager.publish('camera:started')
                        }
                    }),
                    stop: new gsap.timeline({
                        onComplete: () => {
                            EventManager.publish('camera:stopped')
                        }
                    })
                },

                events: []
            }
        },
        methods: {
            getNormalizedDistance(distance, threshold, gap) {
                let x = 0
                if (distance < threshold) {
                    x = 0
                } else if (distance > threshold && distance < threshold * gap) {
                    x = (distance - threshold) / (threshold * gap - threshold)
                } else {
                    x = 1
                }
                return x
            },
            start() {
                this.timelines.start.pause(0)
                this.timelines.start.play()
            },
            stop() {
                this.timelines.stop.pause(0)
                this.timelines.stop.play()
            },
            buildStartTimeline() {
                this.timelines.start.pause(0)
                this.timelines.start.to('.camera-overlay__black-screen', {duration: 1, delay: 0, alpha: 0})
                this.timelines.start.to('.camera-overlay', {duration: 1, delay: .5, alpha: 1})
            },
            buildStopTimeline() {
                this.timelines.stop.pause(0)
                this.timelines.stop.to('.camera-overlay', {duration: 1, delay: 0, alpha: 0})
                this.timelines.stop.to('.camera-overlay__black-screen--off', {duration: 1, delay: 0, alpha: 1})
            },
            displayInstructions() {
                const tl = new gsap.timeline()
                tl.pause()
                tl.fromTo('.camera-overlay__instructions-icon', {alpha: 0, translateY: 10}, {duration: 2, alpha: 1, translateY: 0, ease: 'power3.out'})
                tl.fromTo('.camera-overlay__instructions-text', {alpha: 0, translateY: 10}, {duration: 2, alpha: 1, translateY: 0, ease: 'power3.out'}, "-=1.7")
                tl.play()
            },
            hideInstructions() {
                const tl = new gsap.timeline()
                tl.pause()
                tl.to('.camera-overlay__instructions-text', {duration: .5, alpha: 0, translateY: 10, ease: 'power3.out'}, '#start')
                tl.to('.camera-overlay__instructions-icon', {duration: .5, alpha: 0, translateY: 10, ease: 'power3.out'})
                tl.play()
            }
        },
        beforeMount() {

            this.events.push(EventManager.subscribe('camera:start', () => {
                this.start()
                this.started = true
            }))

            this.events.push(EventManager.subscribe('camera:stop', () => {
                this.stop()
                this.started = false
            }))

            this.events.push(EventManager.subscribe('camera:aiming', (data) => {
                this.aiming = data.aiming
                this.targetSize.current = ((this.targetSize.max - this.targetSize.min) * this.getNormalizedDistance(data.distance, data.threshold, 3)) + this.targetSize.min
            }))

            this.events.push(EventManager.subscribe('camera:progress', (value) => {
                this.progress = Math.round(value)
            }))

            this.events.push(EventManager.subscribe('camera:rec', (value) => {
                this.recording = value
            }))

            this.events.push(EventManager.subscribe('camera:instructions', (instructions) => {
                if (instructions!== false) {
                    this.instructions.text = instructions.text ?? ''
                    this.instructions.icon = instructions.icon ?? null
                    this.displayInstructions()
                } else {
                    this.hideInstructions()
                }
            }))

            this.events.push(EventManager.subscribe('mobile:interaction_set', (interaction) => {
                interaction === 'framing' ? this.progressVisible = true : this.progressVisible = false
                interaction === 'rotation' ? this.rotationVisible = true : this.rotationVisible = false
            }))
            this.events.push(EventManager.subscribe('mobile:interaction', (data) => {
                // Check if traveling
                if(data.type !== 'rotation') return
                this.rotation = data.value
            }))

        },
        mounted() {
            this.buildStartTimeline()
            this.buildStopTimeline()
        },
        beforeDestroy() {
            // Unsubscribe all events before destroy component
            this.events.forEach((event) => event.unsubscribe())
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
        overflow: hidden;

        &__corner {
            position: absolute;
            display: flex;
            height: 3.75rem;
            width: 3.75rem;
            padding: 2rem;
            font-size: 1.5rem;
            font-weight: bold;

            transition: border .3s ease;

            &-element {
                position: absolute;
            }

            &--tl {
                top: 5vh;
                left: 5vh;
                border-top: 2px solid white;
                border-left: 2px solid white;
                justify-content: flex-start;
                align-items: flex-start;

                .aiming & {
                    border-top: 4px solid $color-success;
                    border-left: 4px solid $color-success;
                }
            }

            &--tr {
                top: 5vh;
                right: 5vh;
                border-top: 2px solid white;
                border-right: 2px solid white;
                justify-content: flex-end;
                align-items: flex-start;

                .aiming & {
                    border-top: 4px solid $color-success;
                    border-right: 4px solid $color-success;
                }
            }

            &--bl {
                bottom: 5vh;
                left: 5vh;
                border-bottom: 2px solid white;
                border-left: 2px solid white;
                flex-direction: column;
                justify-content: flex-end;

                .aiming & {
                    border-bottom: 4px solid $color-success;
                    border-left: 4px solid $color-success;
                }

                .camera-overlay__corner-element {
                    left: 1.5rem;
                    bottom: 1.5rem;
                }
            }

            &--br {
                bottom: 5vh;
                right: 5vh;
                border-bottom: 2px solid white;
                border-right: 2px solid white;

                .aiming & {
                    border-bottom: 4px solid $color-success;
                    border-right: 4px solid $color-success;
                }

                .camera-overlay__corner-element {
                    right: 1.5rem;
                    bottom: 1.5rem;
                }
            }
        }

        &__target {
            position: absolute;
            display: flex;
            justify-content: space-between;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: 12.5rem;
            height: 12.5rem;

            &--corner {
                position: absolute;
                width: 2rem;
                height: 2rem;
            }

            &--tl {
                top: 0;
                left: 0;
                border-top: 2px solid white;
                border-left: 2px solid white;
                justify-content: flex-start;
                align-items: flex-start;

                .aiming & {
                    border-top: 2px solid $color-success;
                    border-left: 2px solid $color-success;
                }
            }

            &--tr {
                top: 0;
                right: 0;
                border-top: 2px solid white;
                border-right: 2px solid white;
                justify-content: flex-end;
                align-items: flex-start;

                .aiming & {
                    border-top: 2px solid $color-success;
                    border-right: 2px solid $color-success;
                }
            }

            &--bl {
                bottom: 0;
                left: 0;
                border-bottom: 2px solid white;
                border-left: 2px solid white;
                flex-direction: column;
                justify-content: flex-end;

                .aiming & {
                    border-bottom: 2px solid $color-success;
                    border-left: 2px solid $color-success;
                }
            }

            &--br {
                bottom: 0;
                right: 0;
                border-bottom: 2px solid white;
                border-right: 2px solid white;

                .aiming & {
                    border-bottom: 2px solid $color-success;
                    border-right: 2px solid $color-success;
                }
            }

            &--center {
                flex: 1;
                height: 100%;

                &:before {
                    content: '';
                    position: absolute;
                    top: calc(50% - 1px);
                    left: calc(50% - 1.125rem);
                    height: 2px;
                    width: 2.25rem;
                    background: white;

                    .aiming & {
                        background: $color-success;
                    }
                }

                &:after {
                    content: '';
                    position: absolute;
                    top: calc(50% - 1.125rem);
                    left: calc(50% - 1px);
                    height: 2.25rem;
                    width: 2px;
                    background: white;

                    .aiming & {
                        background: $color-success;
                    }
                }
            }
        }

        &__rotation {
            position: absolute;
            top: 50%;
            right: -50px;
            height: 200px;
            width: calc(100vw + 200px);
            border: 2px solid rgba(white, .5);
            border-radius: 200px;
            transform: translateX(0vw) translateY(-50%);

            opacity: 0;
            transition: opacity 1s ease;

            &.visible {
                opacity: 1;
                transition: opacity 1s ease;
            }

            &:before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                height: 196px;
                width: 196px;
                border-radius: 200px;
                background: rgba($color-primary, .5)
            }
            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 196px;
                width: 196px;
                border-radius: 200px;
                background: rgba($color-primary, .5)
            }
        }

        &__progress {
            position: absolute;
            bottom: 5vh;
            left: 50%;
            transform: translateX(-50%);
            border: 1px solid rgba(white, .5);
            height: 1rem;
            width: 40vw;
            opacity: 0;
            transition: opacity 1s ease;

            &.visible {
                opacity: 1;
                transition: opacity 1s ease;
            }

            &-bar {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: white;
                transition: width .2s linear;
            }

        }

        &__instructions {
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: calc(50% + 9rem);
            width: 100%;

            &-icon {
                height: 6rem;
                opacity: 0;
            }
            &-text {
                display: inline-block;
                text-transform: uppercase;
                letter-spacing: .2rem;
                margin-left: 1rem;
                text-align: center;
                opacity: 0;
            }
        }

        &__hint {
            position: fixed;
            top: calc(50% + 9rem);
            width: 100%;
            display: flex;
            justify-content: center;
            opacity: 0;

            &-text {
                max-width: 35rem;
                text-align: center;
            }
        }

        &__rec {
            display: inline-flex;
            align-items: center;
            color: white;
            font-weight: bold;
            font-size: 1.125rem;

            &-point {
                height: 1.5rem;
                width: 1.5rem;
                margin-right: .2rem;
                border-radius: 100%;
                background-color: #dd2e2e;

                animation: rec 2s infinite; // TODO
            }
        }

        &__black-screen {
            position: fixed;
            z-index: 500;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: black;

            &--off {
                position: fixed;
                z-index: 500;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
                background: black;
                opacity: 0;
            }
        }

    }
</style>
