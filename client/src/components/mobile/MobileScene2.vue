<template>
    <div class="mobile-scene-2" id="mobile-scene-2" ref="mobileScene2" >
        <p class="mobile-scene-2__text">Tape ici</p>
        <div class="mobile-scene-2__wrapper" ref="circleWrapper" @click="shoot"></div>

    </div>
</template>

<script>
    export default {
        name: "MobileScene2",
        components: {},
        data() {
            return {
                timeout : null,
                circleWrapper : null
            }
        },
        methods: {
           /* next() {
                this.$socket.emit('state_request', appStates.SPECTATOR)
            },*/
            shoot() {
               this.$socket.emit('mobile_shoot')
                this.circleAnimation();
            },
            init() {
                this.circleWrapper = this.$refs.circleWrapper;
                this.numberOfCircle = 3;
            },
            circleAnimation() {
                if (this.circleWrapper.children.length > this.numberOfCircle *2) {
                    for (let i = 0; i < this.numberOfCircle; i++) {
                        this.circleWrapper.children[i].remove();
                    }
                }
                if(this.timeout !== null) {
                    clearTimeout(this.timeout)
                }
                this.circleWrapper.classList.add('actressScene__sight__active');
                this.timeout = setTimeout(() => {
                    this.circleWrapper.classList.remove('actressScene__sight__active')
                }, 1000);

                for (let i = 0; i < this.numberOfCircle; i++) {
                    let node = document.createElement('div');
                    node.className = 'mobile-scene-2__wrapper__circle--'+i;
                    this.circleWrapper.appendChild(node);
                }
            }
        },
        mounted() {
            this.init();
            //   this.circleAnimation();
        }

    }
</script>

<style lang="scss">

    .mobile-scene-2 {

        background-color: #202020;
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;

        &__text {
            z-index: 2;
            color: #202020;
            text-transform: uppercase;
            font-family: "Roboto Mono", sans-serif;
            font-size: 18px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__wrapper {

            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            height: 220px;
            width: 220px;
            background-color: #FF4040;
            border-radius: 100%;

            &__circle {
                &--0 {
                    opacity: 0;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    border-radius: 100%;
                    height: 220px;
                    width: 220px;
                    background-color: transparent;
                    transform-origin: center;
                    animation: sonar-effect .5s ease-in-out;
                }

                &--1 {
                    opacity: 0;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    transform-origin: center;
                    border-radius: 100%;
                    height: 220px;
                    width: 220px;
                    background-color: transparent;
                    animation: sonar-effect 1s ease-in-out;
                }

                &--2 {
                    opacity: 0;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    transform-origin: center;
                    border-radius: 100%;
                    height: 220px;
                    width: 220px;
                    background-color: transparent;
                    animation: sonar-effect 1.5s ease-in-out;
                }
            }

        }

    }

    @keyframes sonar-effect {
        0% {
            border: .5px solid #FF4040;
            opacity: 1;
            transform: translate(-50%, -50%) scale3d(1, 1, 1);
        }

        100% {
            border: .5px solid #FF4040;
            transform: translate(-50%, -50%) scale3d(4, 4, 1);
            opacity: 0;
        }

    }
</style>
