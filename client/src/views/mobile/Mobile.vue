<template>
    <div class="mobile">
        <p v-if="debug" class="mobile__debug">
            ID : {{ mobileId }}<br>
            Portrait : {{ isPortrait }}
        </p>

        <component v-show="isPortrait" :is="currentComponent" />
        <template v-if="!isPortrait">
            <p>Utilisez votre téléphone en orientation portrait.</p>
        </template>
        <MobileOrientation v-if="mobileOrientation && isPortrait" />
    </div>
</template>

<script>
    import MobileSetup from "../../components/mobile/MobileSetup";
    import MobileIntro from "../../components/mobile/MobileIntro";
    import MobileCameramanScenery from "../../components/mobile/MobileCameramanScenery";
    import MobileScene2 from "../../components/mobile/MobileScene2";
    import MobileScene3 from "../../components/mobile/MobileScene3";
    import MobileEnd from "../../components/mobile/MobileEnd";
    import appStates from "../../js/appStates";
    import MobileOrientation from "../../components/mobile/orientation/MobileOrientation";

    export default {
        name: "Mobile",
        components: {
            MobileOrientation,
            MobileSetup,
            MobileIntro,
            MobileCameramanScenery,
            MobileScene2,
            MobileScene3,
            MobileEnd
        },
        data() {
            return {
                debug: true,
                isPortrait: false
            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            },
            currentComponent() {
                // TODO: Replace MobileScene1, MobileScene2, ...
                switch(this.$store.state.app.appState) {
                    case appStates.INDEX:
                    case appStates.SETUP:
                        return "MobileSetup"
                    case appStates.INTRO:
                        return "MobileIntro"
                    case appStates.CAMERAMAN:
                        return "MobileCameramanScenery"
                    case appStates.ACTRESS:
                        return "MobileScene2"
                    case appStates.SPECTATOR:
                        return "MobileScene3"
                    case appStates.END:
                        return "MobileEnd"
                    default:
                        return null
                }
            },
            mobileOrientation() {
                switch(this.$store.state.app.appState) {
                    case appStates.CAMERAMAN:
                        return true
                    case appStates.ACTRESS:
                        return true
                    case appStates.SPECTATOR:
                        return true
                    default:
                        return false
                }
            },

        },
        methods:  {
            setPortraitOrientation() {
                this.isPortrait = window.orientation === 0
            }
        },
        created() {
            // Get the mobile ID in route
            this.$store.commit('mobile/setMobileId', this.mobileId)

            // Join the mobile room
            this.$socket.emit('join_mobile_room', this.mobileId)
        },
        beforeMount() {
            window.addEventListener('orientationchange', () => {
                this.setPortraitOrientation()
            })
            this.setPortraitOrientation()
        }
    }
</script>

<style lang="scss" scoped>
    .mobile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
       /* max-height: 100vh;
        overflow: hidden;*/


        &__debug {
            position: fixed;
            z-index: 500;
            top: 0;
            left: 0;
            background: rgba(black, .5);
            color: white;
        }

        button {
            background: white;
            color: black;
            padding: 1rem;
            border-radius: 1rem;
            border: none
        }
    }
</style>
