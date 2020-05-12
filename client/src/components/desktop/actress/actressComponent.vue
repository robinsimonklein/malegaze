<template>
    <div class="actressScene">
        <div class="actressScene__overlayFade" ref="overlayFade"></div>
        <div class="actressScene__wrap" ref="instructionWrap">
            <div class="actressScene__corner actressScene__corner--tl">
                <div class="actressScene__instructions">
                    <img class="actressScene__instructions-img" src="icon/tutorial/smartphone.svg"/>
                    <span class="actressScene__instructions-text">Tirer sur les yeux pour les repousser</span>
                </div>
            </div>
            <div class="actressScene__corner actressScene__corner--tr"></div>
            <div class="actressScene__corner actressScene__corner--bl"></div>
            <div class="actressScene__corner actressScene__corner--br"></div>

            <div class="actressScene__sight" id="actressScene__sight" ref="sightWrapper"></div>
        </div>

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
                this.instructionWrapper = this.$refs.instructionWrap;

                this.numberOfCircle = 1;


                EventManager.subscribe('actress:fadeIn', () => {
                    this.overlayFade.classList.add('actressScene__overlayFade__active');
                });


                EventManager.subscribe('actress:fadeOut', () => {
                    this.overlayFade.classList.remove('actressScene__overlayFade__active');
                });

                EventManager.subscribe('actress:showInstruction', () => {
                    this.instructionWrapper.style.opacity = '1';
                    this.$socket.emit('mobile_show_instruction')
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

        &__wrap {
            opacity: 0;
            transition: opacity .5s;
        }

        &__instructions {
            position: absolute;
            top: 1rem;
            left: 1rem;
            width: 40vw;

            &-text {
                text-transform: uppercase;
                letter-spacing: .2rem;
                margin-left: 1rem;
            }
        }

        &__corner {
            position: absolute;
            display: flex;
            height: 3.75rem;
            width: 3.75rem;
            padding: 2rem;
            font-size: 1.5rem;
            font-weight: bold;

            transition: border .3s ease;

            &-element {
                position: absolute;
            }

            &--tl {
                top: 5vh;
                left: 5vh;
                border-top: 2px solid white;
                border-left: 2px solid white;
                justify-content: flex-start;
                align-items: flex-start;

            }
            &--tr {
                top: 5vh;
                right: 5vh;
                border-top: 2px solid white;
                border-right: 2px solid white;
                justify-content: flex-end;
                align-items: flex-start;


            }
            &--bl {
                bottom: 5vh;
                left: 5vh;
                border-bottom: 2px solid white;
                border-left: 2px solid white;
                flex-direction: column;
                justify-content: flex-end;

            }
            &--br {
                bottom: 5vh;
                right: 5vh;
                border-bottom: 2px solid white;
                border-right: 2px solid white;

                .actressScene__corner-element {
                    right: 1.5rem;
                    bottom: 1.5rem;
                }
            }
        }


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


        &__sight {
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