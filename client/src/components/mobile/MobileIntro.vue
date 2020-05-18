<template>
    <div class="mobile-intro">
        <div class="mobile-intro__wrap">
            <img src="@/assets/png/mobile_intro_camera.png" alt="Camera image">
            <h1> Projection en cours </h1>
        </div>
        <div class="mobile-intro__text">
            Ne verouillez pas <br/> votre téléphone
        </div>
        <!-- <button @click="next" class="btn">Next</button> -->
    </div>
</template>

<script>
    import appStates from "../../js/appStates";
    import gsap from 'gsap'

    export default {
        name: "MobileIntro",
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.CAMERAMAN)
            }
        },
        mounted() {
            const tl = new gsap.timeline()
            tl.from('.mobile-intro__wrap', {duration: 3, delay: 1, ease: 'power2.out', alpha: 0})
            tl.from('.mobile-intro__text', {duration: 3, ease: 'power2.out', alpha: 0}, '<0.5')
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-intro {

        font-family: "Roboto Mono", sans-serif;
        text-transform: uppercase;
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &__wrap {

            margin: 0 auto;
            img {
                transform: translateX(12%);
                margin-bottom: 25px;
            }

            h1 {
                font-size: 15px;
                margin-bottom: 74px;
                text-align: center;
            }
        }

        &__text {
            font-size: 15px;
            color: #FF4040;
            text-align: center;
        }

    }
</style>
