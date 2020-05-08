<template>
    <div class="actressScene">
        <div class="actressScene__tuto" id="actressScene__tuto">
            <div class="actressScene__tuto__content">
                <h2>Repousse les regards</h2>
                <p>Vise puis tape dans la zone definie pour repousser les statues</p>
                <img src="icon/tutorial/tutorial_icon_hit.svg" alt="phone"/>
            </div>
        </div>
        <div class="actressScene__sight" id="actressScene__sight" ref="sightWrapper"></div>
    </div>
</template>

<script>

    import EventManager from "../../../js/event/EventManager";

    export default {
        name: "actressComponent",
        methods: {
            init() {
                this.sightWrapper = this.$refs.sightWrapper;
                this.numberOfCircle = 2;

               var overlay = document.getElementById('actressScene__tuto');
                var sight = document.getElementById('actressScene__sight');

                setTimeout(() => {
                   overlay.style.display = 'none';
                    sight.style.display = 'block';
                },5000);

                EventManager.subscribe('actress:click:animation', () => {
                    if (this.sightWrapper.children.length > this.numberOfCircle *2) {
                        for (let i = 0; i < this.numberOfCircle; i++) {
                            this.sightWrapper.children[i].remove();
                        }
                    }
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

<style lang="scss" scoped>

    .actressScene {

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
            width: 25px;
            height: 25px;
            border-radius: 100%;
            background-color: #ffff;

            &__active {
                width: 25px;
                height: 25px;
                top: 50%;
                left: 50%;
                border-radius: 100%;
                background-color: transparent;
                border: .5px solid #FF4040;
                position: fixed;
                transform: translate(-50%, -50%);

                &--0 {
                    width: 100%;
                    height: 100%;
                    animation: sonar-effect .5s ease-in-out;
                }

                &--1 {
                    width: 100%;
                    height: 100%;
                    animation: sonar-effect 1s ease-in-out;
                }

              /*  &:before {
                    content: '';
                    width: 25px;
                    height: 25px;
                    top: 50%;
                    left: 50%;
                    border-radius: 100%;
                    background-color: transparent;
                    border: .5px solid #FF4040;
                    position: fixed;
                    transform: translate(-50%, -50%);
                    animation: sonar-effect .5s ease-in-out;
                }

                &:after {
                    content: '';
                    width: 25px;
                    height: 25px;
                    top: 50%;
                    left: 50%;
                    border-radius: 100%;
                    background-color: transparent;
                    border: .5px solid #FF4040;
                    position: fixed;
                    transform: translate(-50%, -50%);
                    animation: sonar-effect 1s ease-in-out;
                }*/

            }

        }
    }

    @keyframes sonar-effect {
        0% {
            transform: translate(-50%, -50%) scale3d(0, 0, 1);
        }

        75% {
            opacity: 1;
        }

        100% {
            transform: translate(-50%, -50%) scale3d(2, 2, 1);
            opacity: 0;
        }

    }

</style>