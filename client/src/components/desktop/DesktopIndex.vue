<template>
    <div class="desktop-index">
        <div class="moving-eyes" v-bind:style="{'transform': `translate(${x * 0.02}px, ${y * 0.02}px)`}">
            <img class="eye1" src="@/assets/png/oeil1.png"/>
            <img class="eye2" src="@/assets/png/oeil2.png"/>
            <img class="eye3" src="@/assets/png/oeil3.png"/>
        </div>
        <p class="eye">
            <img src="@/assets/png/loading_eye.png" alt="loading"/>
            <span class="circle"></span>
        </p>
        <div class="title">
            <h1>Male Gaze</h1>
            <div class="trait"></div>
            <div class="trait"></div>
        </div>
        <h2>Une perspective cinématographique </h2>
        <a class="desktop-index__start" @click="start">
            <span>Démarrer l’expérience</span>
        </a>
        <footer>
            <img src="@/assets/png/gobelins.png" alt="gobelins"/>
            <p>Nicolas Jupiter - Sonia Rouabhi - Robin Simonklein - Florian Weidmann - Florian Peter</p>
        </footer>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "DesktopIndex",
        data() {
            return {
              x: 0,
              y: 0
            };
        },
        methods: {
            start() {
                this.$store.dispatch('app/requestState', appStates.SETUP);
            }
        },
        mounted() {
            const middleX = screen.width / 2;
            const middleY = screen.height / 2;
            document.querySelector('.desktop-index').addEventListener('mousemove', (e) => {
                this.x = - (e.clientX - middleX);
                this.y = - (e.clientY - middleY);
            });
        }
    }
</script>

<style lang="scss" scoped>
    .desktop-index {
        background: #202020;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
        position: relative;
        background: url("/png/home_background.png");
        background-size: cover;

        .moving-eyes {
            position: absolute;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;

            img::selection {
                background: none;
            }

            .eye1 {
                position: absolute;
                left: calc(40vw - 70px);
                top: 50vh;
                transform: scale(0.7);
            }

            .eye2 {
                position: absolute;
                left: calc(70vw - 91px);
                top: 50vh;
                transform: scale(0.7);
            }

            .eye3 {
                position: absolute;
                left: calc(50vw - 60px);
                top: 20vh;
                transform: scale(0.7);
            }

            img {
                animation: 5s backgroundEye infinite alternate;
            }
        }

        .eye {
            position: relative;

            .circle {
                width: 31px;
                height: 31px;
                background: #FF4040;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                top: 80px;
                transform-origin: left center;
                transform: rotate(90deg);
                animation: eye 2s infinite alternate;
            }
        }

        .title {
            position: relative;

            .trait {
                height: 1px;
                width: 15vw;
                position: absolute;
                top: 50%;
                background: white;

                &:first-of-type {
                    left: -50%;
                }

                &:last-of-type {
                    right: -50%;
                }
            }

            h1 {
                text-transform: uppercase;
                font-size: 8vw;
            }
        }

        h2 {
            position: relative;
            font-weight: normal;
            margin-bottom: 50px;
            letter-spacing: 8px;
            font-size: 1.5vw;
            text-transform: uppercase;
        }

        &__start {
            padding: 20px 80px;
            border: 2px solid #FF4040;
            position: relative;
            cursor: pointer;

            span {
                position: relative;
                min-font-size: 1vw;
                max-font-size: 18px;
                z-index: 1;
                color: #FF4040;
                text-transform: uppercase;
                transition: all .5s;
            }

            &:hover {
                &:after {
                    height: 100%;
                }

                span {
                    color: white;
                }
            }

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                background: #FF4040;
                transition: all .5s;
            }
        }

        footer {
            text-align: center;
            position: absolute;
            bottom: 20px;
            font-size: 12px;
        }
    }

    @keyframes eye {
        0% {
            transform: translateX(0) translateY(0);
        }

        40% {
            transform: translateX(-10px) translateY(20px);
        }

        60% {
            transform: translateX(-20px) translateY(20px);
        }

        100% {
            transform: translateX(-40px) translateY(0);
        }
    }

    @keyframes backgroundEye {
        from {
            transform: scale(0.7) translateY(-20px);
        }
        to {
            transform: scale(0.7) translateY(20px);
        }
    }
</style>
