<template>
    <div class="desktop">
        <component :is="currentComponent" />
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import DesktopIndex from "../../components/desktop/DesktopIndex";
    import DesktopSetup from "../../components/desktop/DesktopSetup";
    import DesktopIntro from "../../components/desktop/DesktopIntro";
    import DesktopScene from "../../components/desktop/DesktopScene";
    import DesktopEnd from "../../components/desktop/DesktopEnd";
    import appStates from "../../js/appStates";

    export default {
        name: 'Desktop',
        components: {
            DesktopIndex,
            DesktopScene,
            DesktopIntro,
            DesktopSetup,
            DesktopEnd
        },
        computed: {
            ...mapState('mobile', ['orientation', 'screenOrientation']),
            currentComponent() {
                switch(this.$store.state.app.appState) {
                    case appStates.INDEX:
                        return "DesktopIndex"
                    case appStates.SETUP:
                        return "DesktopSetup"
                    case appStates.INTRO:
                        return "DesktopIntro"
                    case appStates.SCENE1:
                    case appStates.SCENE2:
                    case appStates.SCENE3:
                        return "DesktopScene"
                    case appStates.END:
                        return "DesktopEnd"
                    default:
                        return null
                }
            }
        },
        beforeCreate() {
            if(process.env.VUE_APP_SKIP_MOBILE_SETUP === "true" && process.env.NODE_ENV === 'development'){
                this.$store.commit('mobile/setMobileId', '_dev')
            }else {
                this.$store.commit('mobile/generateMobileId')
            }
        },
        beforeMount() {
            this.$socket.emit('join_mobile_room', this.$store.state.mobile.mobileId)
        },
    }
</script>
<style lang="scss" scoped>
    .desktop {
        min-height: 100vh
    }
</style>
