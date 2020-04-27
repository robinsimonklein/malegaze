<template>
    <div class="desktop-loader">
        <h1>{{ loadingProgress }} %</h1>
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
        justify-content: center;
        align-items: center;
    }
</style>
