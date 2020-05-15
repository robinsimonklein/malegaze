<template>
    <div class="desktop">
        <template v-if="loading">
            <DesktopLoader />
        </template>
        <template v-else>
            <component :is="currentComponent" />
            <DesktopSubtitles />
        </template>
    </div>
</template>

<script>
    import LoaderManager from '@/js/three/loader/LoaderManager'
    import { mapState } from 'vuex'
    import DesktopIndex from "../../components/desktop/DesktopIndex";
    import DesktopSetup from "../../components/desktop/DesktopSetup";
    import DesktopIntro from "../../components/desktop/DesktopIntro";
    import DesktopScene from "../../components/desktop/DesktopScene";
    import DesktopEnd from "../../components/desktop/DesktopEnd";
    import appStates from "../../js/appStates";
    import DesktopLoader from "../../components/desktop/loader/DesktopLoader";
    import EventManager from "../../js/event/EventManager";
    import DesktopSubtitles from "../../components/desktop/subtitles/DesktopSubtitles";

    export default {
        name: 'Desktop',
        components: {
            DesktopSubtitles,
            DesktopLoader,
            DesktopIndex,
            DesktopScene,
            DesktopIntro,
            DesktopSetup,
            DesktopEnd
        },
        computed: {
            ...mapState('desktop', ['loading']),
            ...mapState('mobile', ['orientation', 'screenOrientation']),
            currentComponent() {
                switch(this.$store.state.app.appState) {
                    case appStates.INDEX:
                        return "DesktopIndex"
                    case appStates.SETUP:
                        return "DesktopSetup"
                    case appStates.INTRO:
                        return "DesktopIntro"
                    case appStates.CAMERAMAN:
                    case appStates.ACTRESS:
                    case appStates.SPECTATOR:
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

            // Load models, audio, ...
            LoaderManager.load()
        },
        beforeMount() {
            this.$socket.emit('join_mobile_room', this.$store.state.mobile.mobileId)
        },
        mounted() {
            EventManager.subscribe('mobile:interaction_set', (interaction) => {
                this.$socket.emit('mobile_interaction_set', interaction)
            })
            EventManager.subscribe('mobile:allow_next', () => {
                this.$socket.emit('mobile_allow_next')
            })
        }
    }
</script>
<style lang="scss" scoped>
    .desktop {
        min-height: 100vh;
        background-color: $color-dark;
    }
</style>
