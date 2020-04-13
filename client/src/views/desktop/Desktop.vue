<template>
    <div class="desktop">
        <component :is="currentComponent" />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import DesktopSetup from "../../components/desktop/DesktopSetup";
    import DesktopScene from "../../components/desktop/DesktopScene";

    export default {
        name: 'Desktop',
        components: {
            DesktopScene,
            DesktopSetup
        },
        computed: {
            ...mapState('mobile', ['orientation', 'screenOrientation']),
            currentComponent() {
                switch(this.$store.state.app.appState) {
                    case "setup":
                        return "DesktopSetup"
                    case "intro":
                        return "DesktopIntro"
                    case "storyboard":
                        return "DesktopStoryboard"
                    case "scene1":
                    case "scene2":
                    case "scene3":
                        return "DesktopScene"
                    case "end":
                        return "DesktopEnd"
                    default:
                        return null
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .desktop {
        min-height: 100vh
    }
</style>
