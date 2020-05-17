import gsap from "gsap";
<template>
    <div class="spectatorScene">
        <div ref="sight" class="spectatorScene__sight" id="spectatorScene__sight"></div>
        <div ref="fadingOut" class="fading-out" :class="{'active' : !visible}"></div>

        <div class="spectatorScene__instructions">
            <img class="spectatorScene__instructions-icon" :src="instructions.icon">
            <p class="spectatorScene__instructions-text"> {{ instructions.text }}</p>
        </div>
    </div>
</template>

<script>
    import EventManager from '../../../js/event/EventManager';
    import gsap from 'gsap'

    export default {
        name: 'spectatorComponent',
        data() {
            return {
                visible: false,
                events: [],
                instructions: {
                    text: '',
                    icon: ''
                }
            }
        },
        methods: {
            displayInstructions() {
                const tl = new gsap.timeline()
                tl.pause()
                tl.fromTo('.spectatorScene__instructions-icon', {alpha: 0, translateY: 10}, {duration: 2, alpha: 1, translateY: 0, ease: 'power3.out'})
                tl.fromTo('.spectatorScene__instructions-text', {alpha: 0, translateY: 10}, {duration: 2, alpha: 1, translateY: 0, ease: 'power3.out'}, "-=1.7")
                tl.play()
            },
            hideInstructions() {
                const tl = new gsap.timeline()
                tl.pause()
                tl.to('.spectatorScene__instructions-text', {duration: .5, alpha: 0, translateY: 10, ease: 'power3.out'}, '#start')
                tl.to('.spectatorScene__instructions-icon', {duration: .5, alpha: 0, translateY: 10, ease: 'power3.out'})
                tl.play()
            }
        },
        mounted() {
            this.events.push(EventManager.subscribe('spectator:fadeout', () => {
                this.visible = false
            }))

            this.events.push(EventManager.subscribe('spectator:fadein', () => {
                this.visible = true
            }))

            this.events.push(EventManager.subscribe('spectatorDetected', () => {
                this.$refs.sight.classList.add('active');
            }));

            this.events.push(EventManager.subscribe('spectatorNotDetected', () => {
                this.$refs.sight.classList.remove('active');
            }));


            this.events.push(EventManager.subscribe('camera:instructions', (instructions) => {
                if (instructions!== false) {
                    this.instructions.text = instructions.text ?? ''
                    this.instructions.icon = instructions.icon ?? null
                    this.displayInstructions()
                } else {
                    this.hideInstructions()
                }
            }))
        },

        beforeDestroy() {
            this.events.forEach((event) => {
                event.unsubscribe()
            })
        }
    }
</script>

<style lang="scss" scoped>
    .spectatorScene {
        &__sight {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 25px;
            height: 25px;
            border-radius: 50px;
            background-color: white;
            opacity: 0;
            transition: background-color .3s ease;

            &.active {
                transition: background-color .3s ease;
                background-color: $color-primary;
            }
        }
        .fading-out {
            background: black;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 999;
            opacity: 0;
            transition: opacity 1s ease-out;

            &.active {
                opacity: 1;
                transition: opacity 1s ease-out;
            }
        }

        &__instructions {
            position: fixed;
            display: flex;
            flex-direction: column;
            top: calc(50% + 9rem);
            width: 100%;

            &-icon {
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
    }
</style>
