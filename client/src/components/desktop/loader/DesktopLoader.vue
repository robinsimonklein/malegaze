<template>
    <div class="desktop-loader">
        <div class="loading">
            <p>
                <img src="@/assets/png/loading_eye.png" alt="loading"/>
                <span class="circle"></span>
            </p>
            <h2>{{ loadingProgress }}%</h2>
        </div>
        <div class="sound">
            <img src="@/assets/png/sound.png" alt="put_sound">
            <p>Montez le son pour une<br/> meilleure expérience</p>
        </div>
        <!-- <p class="desktop-loader__text">Chargement...</p> -->
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "DesktopLoader",
        computed: {
            ...mapState('desktop', ['loadingProgress'])
        }
    }
</script>

<style lang="scss" scoped>
    .desktop-loader {
        height: 100vh;
        width: 100vw;
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity;
        flex-wrap: wrap;

        > div {
            width: 100%;
        }

        .loading {
            align-self: flex-end;
            text-align: center;
            height: 20vh;

            > p {
                position: relative;

                .circle {
                    width: 31px;
                    height: 31px;
                    background: #FF4040;
                    border-radius: 50%;
                    position: absolute;
                    left: calc(50% - 7px);
                    top: 80px;
                    transform-origin: left center;
                    transform: rotate(90deg);
                    animation: eye 2s infinite;
                }
            }

            h2 {
                color: #FF4040;
                letter-spacing: 15px;
                font-weight: normal;
                text-align: center;
            }
        }

        &__text {
            animation: loading 2s infinite;
        }

        .sound {
            text-align: center;
            align-self: flex-end;
            margin-bottom: 10vh;

            p {
                letter-spacing: 3px;
                font-size: 20px;
                margin-top: 1rem;
            }
        }
    }

    @keyframes loading {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }
    
    @keyframes eye {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
