<template>
    <div class="actressScene">
        <div class="actressScene__overlayFade" ref="overlayFade"></div>
        <div class="actressScene__instructions" ref="instructionWrap">
            <img class="actressScene__instructions-icon" src="icon/tutorial/tutorial_icon_hit.gif">
            <p class="actressScene__instructions-text">Repousse les regards en tapant sur les yeux</p>
        </div>
        <div class="actressScene__sight" id="actressScene__sight" ref="sightWrapper"></div>
    </div>
</template>

<script>

    import EventManager from "../../../js/event/EventManager";
    import gsap from 'gsap';

    export default {
        name: "actressComponent",
        data() {
            return {
                sightWrapper: null,
                timeout : null,
            }
        },
        methods: {
            init() {
                this.sightWrapper = this.$refs.sightWrapper;
                this.overlayFade = this.$refs.overlayFade;
                this.instructionWrapper = this.$refs.instructionWrap;

                this.numberOfCircle = 1;

                var tlFadeIn = new gsap.timeline();
                tlFadeIn.pause();
                tlFadeIn.to('.actressScene__overlayFade', {
                    opacity: 1,
                    duration: 2,
                    onComplete() {
                        EventManager.publish('actress:transition')
                    }
                });

                var tlFadeOut = new gsap.timeline();
                tlFadeOut.pause();
                tlFadeOut.to('.actressScene__overlayFade', {
                    opacity: 0,
                    duration: 1
                });

                EventManager.subscribe('actress:fadeIn', () => {
                    tlFadeIn.play();
                });


                EventManager.subscribe('actress:fadeOut', () => {
                    tlFadeOut.play();
                });

                EventManager.subscribe('actress:showInstruction', () => {
                    this.displayInstructions()
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
            },
            displayInstructions() {
                const tl = new gsap.timeline()
                tl.pause()
                tl.fromTo('.actressScene__instructions-icon', {alpha: 0, translateY: 10}, {duration: 2, alpha: 1, translateY: 0, ease: 'power3.out'})
                tl.fromTo('.actressScene__instructions-text', {alpha: 0, translateY: 10}, {duration: 2, alpha: 1, translateY: 0, ease: 'power3.out'}, "-=1.7")
                tl.play()
            },
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
            position: absolute;
            left: 50%;
            bottom: 10%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;

            span {
                color: #fff;
                font-size: 18px;
                font-family: "Roboto Mono", sans-serif;
                width: 53%;
                align-self: center;
                text-align: center;
            }

        }

        &__instructions {
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: calc(50% + 9rem);
            width: 100%;

            &-icon {
                height: 7rem;
                opacity: 0;
            }
            &-text {
                display: inline-block;
                text-transform: uppercase;
                letter-spacing: .2rem;
                margin-left: 1rem;
                text-align: center;
                opacity: 0;
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
            opacity: 1;
            transition: all 1.5s;


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
