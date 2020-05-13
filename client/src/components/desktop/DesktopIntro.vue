<template>
    <div class="desktop-intro">
        <video v-if="visible" class="desktop-intro__video" poster="/png/intro_poster.png" ref="player">
            <source src="/video/intro.mp4" type="video/mp4">
        </video>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "DesktopIntro",
        data() {
            return {
                player: null,
                visible: true
            };
        },
        mounted() {
            this.$refs.player.addEventListener('ended', () => {
                this.visible = false;
                this.$store.dispatch('app/requestState', appStates.CAMERAMAN);
            })

            try {
                this.$refs.player.play();
            }
            catch (err) {
                console.error(err);
            }
        }
    }
</script>

<style lang="scss" scoped>
.desktop-intro {
    background: black;
    &__start {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 2;
        color: black;
        background-color: white;

    }
    &__video {
        width: 100vw;
        height: 100vh;
    }
}
</style>
