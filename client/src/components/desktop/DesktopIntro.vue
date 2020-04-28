<template>
    <div class="desktop-intro">
        <button class="desktop-intro__start" @click="startVideo">Forcer la vidéo (provisoir)</button>
        <video class="desktop-intro__video" ref="player">
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
                player: null
            }
        },
        methods: {
            startVideo() {
                this.$refs.player.play()
            }
        },
        mounted() {
            // Commencer la vidéo si on arrive directement sur cette vue, provisoir.
            this.$refs.player.addEventListener('ended', () => {
                this.$store.dispatch('app/requestState', appStates.CAMERAMAN)
            })

            try {
                this.$refs.player.play()
            }
            catch (err) {
                console.error(err)
            }
        }
    }
</script>

<style lang="scss" scoped>
.desktop-intro {
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
