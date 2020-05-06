<template>
    <div class="desktop-tutorial">
        <h1 class="desktop-tutorial__title" v-html="title"></h1>
        <p class="desktop-tutorial__subtitle" v-html="subtitle"></p>
        <img class="desktop-tutorial__icon" :class="[animation ? `animation_${animation}` : '']"
             :src="`/icon/tutorial/${icon}`" :alt="title"/>
    </div>
</template>

<script>
    import EventManager from "../../js/event/EventManager";
    import gsap from 'gsap'

    export default {
        name: "DesktopTutorial",
        data() {
            return {
                title: 'Title',
                subtitle: 'This is the subtitle',
                icon: 'tutorial_icon_frame.svg',
                animation: null,
                duration: 0,

                event: null,
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
                    EventManager.publish('tutorial:displayed')
                }
            })
            this.timeline.pause()
        },
        mounted() {
            this.timeline.from('.desktop-tutorial', {duration: 1, alpha: 0},)
            this.timeline.from('.desktop-tutorial__title', {duration: 1, alpha: 0, ease: "power2.out"}, '-=0.8')
            this.timeline.from('.desktop-tutorial__subtitle', {duration: 1, alpha: 0, ease: "power2.out"}, '-=0.8')
            this.timeline.from('.desktop-tutorial__icon', {duration: 1, alpha: 0, ease: "power2.out"}, '-=0.8')


            this.timeline.to('.desktop-tutorial', {duration: 1, alpha: 0, ease: "power2.out"}, '+=4')


            this.event = EventManager.subscribe('tutorial:display', (data) => {
                this.title = data.title ?? 'Title';
                this.subtitle = data.subtitle ?? 'This is the subtitle';
                this.icon = data.icon ?? 'icon';
                this.animation = data.animation ?? null

                this.playTimeline()
            })
        },
        beforeDestroy() {
            this.event.unsubscribe()
        }
    }
</script>

<style lang="scss" scoped>
    .desktop-tutorial {
        position: fixed;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgba(black, .6);

        &__title {
            font-size: 3.75rem;
            text-transform: uppercase;
            font-weight: bold;
            letter-spacing: 1rem;
            color: $color-primary;
        }

        &__subtitle {
            font-size: 1.5rem;
            text-transform: uppercase;
            font-weight: normal;
            letter-spacing: .5rem;
            color: $color-primary;
        }

        &__icon {
            margin-top: 1rem;
        }
    }

    .animation_orientation {
        animation-name: orientation;
        animation-duration: 3s;
        animation-iteration-count: infinite;
    }

    @keyframes orientation {
        0% {
            transform: rotate3d(0, 1, 0, 0deg);
        }
        33% {
            transform: rotate3d(0.1, 1, 0.1, -30deg);
        }
        77% {
            transform: rotate3d(0.1, 1, 0.1, 30deg);
        }
    }
</style>
