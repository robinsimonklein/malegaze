<template>
    <div class="actressScene">
        <div class="actressScene__overlayFade" ref="overlayFade"></div>
        <!--<div class="actressScene__tuto" id="actressScene__tuto">
            <div class="actressScene__tuto__content">
                <h2>Repousse les regards</h2>
                <p>Vise puis tape dans la zone definie pour repousser les statues</p>
                <img src="icon/tutorial/tutorial_icon_hit.svg" alt="phone"/>
            </div>
        </div>-->
        <div class="actressScene__sight" id="actressScene__sight" ref="sightWrapper"></div>
    </div>
</template>

<script>

    import EventManager from "../../../js/event/EventManager";

    export default {
        name: "actressComponent",
        data() {
            return {
                sightWrapper: null,
                timeout : null
            }
        },
        methods: {
            init() {
                this.sightWrapper = this.$refs.sightWrapper;
                this.overlayFade = this.$refs.overlayFade;

                this.numberOfCircle = 1;

              //  var overlay = document.getElementById('actressScene__tuto');
                var sight = document.getElementById('actressScene__sight');

                setTimeout(() => {
                 //  overlay.style.display = 'none';
                    sight.style.display = 'block';
                },5000);

                EventManager.subscribe('actress:fade', () => {
                    if(this.overlayFade.classList.contains('actressScene__overlayFade__active')) {
                        this.overlayFade.classList.remove('actressScene__overlayFade__active');
                    } else {
                        this.overlayFade.classList.add('actressScene__overlayFade__active');
                    }

                });

                EventManager.subscribe('actress:click:animation', () => {
                    if (this.sightWrapper.children.length > this.numberOfCircle *2) {
                        for (let i = 0; i < this.numberOfCircle; i++) {
                            this.sightWrapper.children[i].remove();
                        }
                    }

                    if(self.timeout !== null) {
                        clearTimeout(self.timeout)
                    }

                    this.sightWrapper.classList.add('actressScene__sight__active');
                    self.timeout = setTimeout(() => {
                        this.sightWrapper.classList.remove('actressScene__sight__active')
                    }, 500);

                    for (let i = 0; i < this.numberOfCircle; i++) {
                        this.generateCircle(i)
                    }
                });

            },
            generateCircle(number) {

                let node = document.createElement('div');
                node.className = 'actressScene__sight__active--'+number;
                this.sightWrapper.appendChild(node);
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss">

    .actressScene {

        &__overlayFade {
            background: black;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 999;
            opacity: 1;
            transition: all 1.5s;

            &__active {
                opacity: 0;
            }

        }

        &__tuto {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);

            &__content {
                position: fixed;
                left: 50%;
                top: 50%;

                width: 100%;
                text-align: center;
                transform: translate(-50%, -50%);
                font-family: "Roboto Mono", sans-serif;
                color: #FF4040;
                h2 {
                    letter-spacing: 10px;
                    font-size: 60px;
                    font-weight: bold;
                    text-transform: uppercase;
                }

                p {
                    font-size: 24px;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    margin-bottom: 90px;
                }
            }
        }

        &__sight {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background-color: transparent;
            border: 1px solid #ffff;

            &__active {

                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border-radius: 100%;
                background-color: #FF4040;

                &--0 {
                    opacity: 0;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    border-radius: 100%;
                    width: 40px;
                    height: 40px;
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
                    width: 29px;
                    height: 29px;
                    background-color: transparent;
                    animation: sonar-effect 1s ease-in-out;
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

        75% {
            opacity: 1;
        }

        100% {
            border: .5px solid #FF4040;
            transform: translate(-50%, -50%) scale3d(3, 3, 1);
            opacity: 0;
        }

    }

</style>