<template>
    <div class="mobile">
        <p v-if="debug" class="mobile__debug">ID : {{ this.mobileId }}</p>

        <component :is="currentComponent" />
    </div>
</template>

<script>
    import MobileSetup from "../../components/mobile/MobileSetup";
    import MobileIntro from "../../components/mobile/MobileIntro";
    import MobileStoryboard from "../../components/mobile/MobileStoryboard";
    import MobileScene1 from "../../components/mobile/MobileScene1";
    import MobileScene2 from "../../components/mobile/MobileScene2";
    import MobileScene3 from "../../components/mobile/MobileScene3";
    import MobileEnd from "../../components/mobile/MobileEnd";
    import appStates from "../../js/appStates";

    export default {
        name: "Mobile",
        components: {
            MobileSetup,
            MobileIntro,
            MobileStoryboard,
            MobileScene1,
            MobileScene2,
            MobileScene3,
            MobileEnd
        },
        data() {
            return {
                debug: true,
            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            },
            currentComponent() {
                switch(this.$store.state.app.appState) {
                    case appStates.SETUP:
                        return "MobileSetup"
                    case appStates.INTRO:
                        return "MobileIntro"
                    case appStates.STORYBOARD:
                        return "MobileStoryboard"
                    case appStates.SCENE1:
                        return "MobileScene1"
                    case appStates.SCENE2:
                        return "MobileScene2"
                    case appStates.SCENE3:
                        return "MobileScene3"
                    case appStates.END:
                        return "MobileEnd"
                    default:
                        return null
                }
            }
        },
        created() {
            // Get the mobile ID in route
            this.$store.commit('mobile/setMobileId', this.mobileId)

            // Join the mobile room
            this.$socket.emit('join_mobile_room', this.mobileId)
        },
    }
</script>

<style lang="scss" scoped>
    .mobile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

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
