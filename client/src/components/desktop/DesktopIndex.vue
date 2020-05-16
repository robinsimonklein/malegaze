<template>
    <div class="desktop-index">
        <h1>Male Gaze</h1>
        <h2>Une expérience cinématographique</h2>
        <a class="desktop-index__start" @click="start">
            <span>Démarrer l’expérience</span>
        </a>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "DesktopIndex",
        methods: {
            start() {
                this.$store.dispatch('app/requestState', appStates.SETUP)
            }
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

        h1 {
            text-transform: uppercase;
            margin-bottom: 10px;
            font-size: 65px;
        }

        h2 {
            font-weight: normal;
            margin-bottom: 100px;
            letter-spacing: 8px;
            font-size: 30px;
        }

        &__start {
            padding: 20px 80px;
            border: 2px solid white;
            position: relative;
            cursor: pointer;

            span {
                position: relative;
                font-size: 30px;
                z-index: 1;
                color: white;
                transition: all .5s;
            }

            &:hover {
                &:after {
                    height: 100%;
                }
                span {
                    color: #202020;
                }
            }

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 0;
                background: white;
                transition: all .5s;
            }
        }
    }
</style>
