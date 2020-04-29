<template>
    <div class="mobile-scene-2" id="mobile-scene-2" ref="mobileScene2" @click="shoot">
        <p>Tap the screen</p>
        <div class="mobile-scene-2__wrapper" ref="circleWrapper">
            <div class=""></div>
            <div class=""></div>
            <div class=""></div>
        </div>
        <button @click="next" class="btn mobile-scene-2__button">Next</button>

        <!-- Track the mobile orientation -->
        <MobileOrientation :debug="false"/>
    </div>
</template>

<script>
    import appStates from '../../js/appStates';
    import MobileOrientation from './orientation/MobileOrientation';

    export default {
        name: "MobileScene2",
        components: {MobileOrientation},
        data() {
            return {
                isClicked: false,
                wrapperDiv: null,
                compter: 0
            }
        },
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SPECTATOR)
            },

            shoot() {
               this.$socket.emit('mobile_shoot')
            },
            init() {
                this.sceneDiv = this.$refs.circleWrapper;
                this.circleAnimation();
                window.addEventListener('click', () => {
                    this.resetCircleAnimation()
                });
                window.addEventListener('click', () => {
                    this.createCircle()
                });
            },

            resetCircleAnimation() {
                if (!this.isClicked) {
                    this.isClicked = true;
                    this.sceneDiv.innerHTML = '';
                }
            },
            createCircle() {
                if (this.sceneDiv.children.length > 10) {
                    for (let i = 0; i < 5; i++) {
                        this.sceneDiv.children[i].remove();
                    }
                }
                let node = document.createElement('div');
                node.className = 'mobile-scene-2__circle';
                this.sceneDiv.appendChild(node);
                //this.sceneDiv.appendChild();
            },
            circleAnimation() {
                let counter = 0;
                setInterval(() => {
                    if (!this.isClicked) {
                        if (counter < this.sceneDiv.children.length + 1) {
                            if (this.sceneDiv.children[counter] !== undefined) {
                                this.sceneDiv.children[counter].classList.add('mobile-scene-2__circle')
                            }
                            counter++;
                        } else {
                            this.sceneDiv.children.forEach(function (el) {
                                el.classList.remove('mobile-scene-2__circle')
                            });
                            counter = 0;
                        }
                    }
                }, 500);
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

        p {
            color: darkred;
            text-transform: uppercase;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &__circle {
            width: 10rem;
            height: 10rem;
            background-color: transparent;
            border-radius: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: scale3d(0, 0, 0);
            transform-origin: center;
            border: .05rem solid darkred;
            // transform: translate(-50%, -50%) scale(1.5);
            animation: circleAnimation 1s ease-out;
        }

        &__button {
            position: absolute;
            top: 1%;
            right: 1%;
        }

    }

    @keyframes circleAnimation {
        0% {
            transform: translate(-50%, -50%) scale3d(0, 0, 1);
        }

        100% {
            transform: translate(-50%, -50%) scale3d(5, 5, 1);
        }

    }
</style>
