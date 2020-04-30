<template>
    <div class="desktop-loader">
        <h1>{{ loadingProgress }} %</h1>
        <p class="desktop-loader__text">Chargement...</p>
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
    .desktop-loader{
        height: 100vh;
        width: 100vw;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: opacity;

        &__text {
            animation: loading 2s infinite;
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
</style>
