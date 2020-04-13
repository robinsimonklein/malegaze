<template>
    <div class="home">
        <component :is="currentComponent" />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import MobileConnectionSetup from "../../components/desktop/mobileConnection/MobileConnectionSetup";
    import Scene from "../../components/desktop/Scene";

    export default {
        name: 'Home',
        components: {
            Scene,
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
                        return "Scene"
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
    .home {
        min-height: 100vh
    }
</style>
