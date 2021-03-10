<template>
    <div class="camera-transition">
        <p class="camera-transition__text" v-html="text"></p>
        <span class="camera-transition__comment" v-show="comment">— {{ comment }}</span>
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
                text: 'Transition text',
                comment: 'Comment',
                timeline: null
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
            this.timeline.from('.camera-transition__comment', {duration: 2, alpha: 0, ease: "power3.out"}, '-=0.5')

            this.timeline.to('.camera-transition__text', {duration: 1, alpha: 0, ease: "power3.out"}, '+=4') // 6
            this.timeline.to('.camera-transition__comment', {duration: 1, alpha: 0, ease: "power3.out"}, '-=1')
            this.timeline.to('.camera-transition', {duration: 1, alpha: 0, ease: "power3.out"}, '-=0.5')

            this.event = EventManager.subscribe('transition:start', (data) => {
                this.text = data.text ?? null
                this.comment = data.comment ?? null
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
    background: rgba(black, .9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__text {
        max-width: 40rem;
        font-size: 1.6rem;
        text-align: center;
        width: 75vw;
    }

    &__comment {
        color: $color-primary;
        margin-top: 1rem;
        max-width: 80vw;
        font-size: 1rem;
        text-align: center;
        width: 1300px;
    }
}
</style>
