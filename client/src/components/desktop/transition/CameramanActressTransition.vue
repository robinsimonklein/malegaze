<template>
    <div class="transition-cameraman">
        <img class="transition-cameraman__image" src="@/assets/png/transition_screen_spot.png" alt="">
        <div class="transition-cameraman__wrap">
            <p>Le corps de la femme s'identifier comme un <span>objet de convoitise.</span>
                Les regards extérieurs émettent une pression sur les femmes, modifient <span>leur comportement</span> dans la
                société et <span>la perception qu'elles ont d'elles-mêmes.</span>
            </p>
        </div>
    </div>
</template>

<script>

    import gsap from 'gsap';
    import EventManager from "../../../js/event/EventManager";

    export default {
        name: "CameramanActressTransition",
        methods: {
            init() {
                var tl = new gsap.timeline();
                tl.pause();
                tl.to('.transition-cameraman__image', {opacity:1, duration: 1, delay: 1});
                tl.to('.transition-cameraman__wrap', {opacity:1, duration: 2});
                tl.to('.transition-cameraman__image', {scale: 1.05, duration: 8}, "-=2");

                tl.to('.transition-cameraman', {
                    opacity: 1,
                    duration: 1,
                    onComplete() {
                        EventManager.publish('cameraman:nextScene');
                    }
                });


                EventManager.subscribe('cameraman:transition', () => {
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
    .transition-cameraman {
        position: fixed;
        z-index: 10;

        &__image {
            opacity: 0;
            width: 100vw;
            height: 100vh;
            background-size: cover;
        }

        &__blackOverlay {
            opacity: 0;
            width: 100vw;
            height: 100vh;
            background-color: #000000;
            z-index: 15;
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