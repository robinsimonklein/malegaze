<template>
    <div class="desktop-index">
        <h1>Male Gaze</h1>
        <button class="desktop-index__start" @click="start">Commencer</button>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    &__start {
        background: white;
        padding: 1rem;
    }
}
</style>
