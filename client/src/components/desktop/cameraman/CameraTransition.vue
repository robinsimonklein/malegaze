<template>
    <div class="camera-transition">
        <p class="camera-transition__text" v-html="text"></p>
    </div>
</template>

<script>
    import EventManager from "../../../js/event/EventManager";
    import gsap from 'gsap'

    export default {
        name: "CameraTransition",
        data() {
            return {
                event : null,
                text: 'Il faut savoir mettre en avant les atouts de nos actrices. Le réalisateur a fait un très bon choix de commencer par un traveling de bas en haut.'
            }
        },
        methods: {
            playTimeline() {
                this.timeline.pause(0)
                this.timeline.play()
            }
        },
        created() {
            this.timeline = gsap.timeline({
                onComplete: () => {
                    EventManager.publish('transition:ended')
                }
            })
            this.timeline.pause()
        },
        mounted() {
            this.timeline.from('.camera-transition', {duration: 2, alpha: 0, ease: "power3.out"},)
            this.timeline.from('.camera-transition__text', {duration: 2, alpha: 0, ease: "power3.out"}, '-=0.5')

            this.timeline.to('.camera-transition__text', {duration: 2, alpha: 0, ease: "power3.out"}, '+=4')
            this.timeline.to('.camera-transition', {duration: 2, alpha: 0, ease: "power3.out"}, '-=0.5')

            this.event = EventManager.subscribe('transition:start', (data) => {
                this.text = data.text ?? null
                this.playTimeline()
            })
        },
        beforeDestroy() {
            this.event.unsubscribe()
        }
    }
</script>

<style lang="scss" scoped>
.camera-transition {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    height: 100vh;
    width: 100vw;
    background: rgba(black, .8);
    display: flex;
    justify-content: center;
    align-items: center;

    &__text {
        max-width: 80vw;
        font-size: 1.8rem;
        text-align: center;
        width: 1300px;
    }
}
</style>
