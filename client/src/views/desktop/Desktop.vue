<template>
    <div class="desktop">
        <component :is="currentComponent" />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import MobileConnectionSetup from "../../components/desktop/mobileConnection/MobileConnectionSetup";
    import DesktopScene from "../../components/desktop/DesktopScene";

    export default {
        name: 'Desktop',
        components: {
            DesktopScene,
            MobileConnectionSetup
        },
        computed: {
            ...mapState('mobile', ['orientation', 'screenOrientation']),
            currentComponent() {
                switch(this.$store.state.app.appState) {
                    case "setup":
                        return "MobileConnectionSetup"
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
