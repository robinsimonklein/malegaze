<template>
    <div class="transition-screen">
        <img class="transition-screen__image" src="@/assets/png/transition_screen_camera.png" alt="">
        <div class="transition-screen__wrap">
            <p>Le corps de la femme est mis en scène à l'aide de <span>gros plans <br/> fragmentés</span>
                et de jeux de <span>champs / contre champs</span></p>
        </div>
    </div>
</template>

<script>
    import gsap from 'gsap';
    import EventManager from "../../../js/event/EventManager";

    export default {
        name: "ActressSpectatorTransition",
        methods: {
            init() {
                var tl = new gsap.timeline();
                tl.pause();
                tl.to('.transition-screen__image', {opacity:1, duration: 1, delay: 2});
                tl.to('.transition-screen__wrap', {opacity:1, duration: 2});
                tl.to('.transition-screen__image', {scale: 1.05, duration: 7}, "-=2");

                tl.to('.transition-screen', {
                    opacity: 0,
                    duration: 1,
                    onComplete() {
                        EventManager.publish('actress:stopTransition');
                    }});

                EventManager.subscribe('actress:transition', () => {
                    tl.play();
                });

            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss" scoped>
    .transition-screen {
        position: fixed;
        z-index: 10;

        &__image {
            opacity: 0;
            width: 100vw;
            height: 100vh;
            background-size: cover;
        }

        &__wrap {
            opacity: 0;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            font-family: "Roboto Mono", sans-serif;
            font-size: 24px;
            text-align: justify;

            span {
                color: #FF4040;
            }

            &:before {
                content: '';
                width: 500px;
                height: 1px;
                background-color: #FF4040;
                position: fixed;
                top: -100%;
                left: 50%;
                transform: translateX(-50%);
            }

            &:after {
                content: '';
                width: 500px;
                height: 1px;
                background-color: #FF4040;
                position: fixed;
                bottom: -100%;
                left: 50%;
                transform: translateX(-50%);
            }
        }

    }
</style>