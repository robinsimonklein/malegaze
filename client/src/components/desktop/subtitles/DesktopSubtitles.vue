<template>
    <div v-show="subtitles" class="desktop-subtitles">
        <span class="desktop-subtitles__text">{{ subtitles }}</span>
    </div>
</template>

<script>
    export default {
        name: "DesktopSubtitles",
        computed: {
            subtitles() { return this.$store.state.desktop.subtitles }
        }
    }
</script>

<style lang="scss" scoped>
.desktop-subtitles {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 900;
    left: 0;
    right: 0;
    bottom: 10vh;
    width: 100vw;

    &__text {
        font-size: 1.375rem;
        color: white;
        text-align: center;
        font-family: "Roboto", Arial, sans-serif;
        text-shadow: 2px 2px 16px rgba(black, .8);
    }
}
</style>
