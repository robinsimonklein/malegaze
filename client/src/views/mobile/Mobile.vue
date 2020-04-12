<template>
    <div class="mobile">
        <p v-if="debug" class="mobile__debug">ID : {{ this.mobileId }}</p>

        <MobileSetup v-if="setupMode !== 'ready'" :mode="setupMode"/>

        <!-- Track the mobile orientation -->
        <MobileOrientation v-if="setupMode === 'ready'" :debug="true" />
    </div>
</template>

<script>
    import MobileSetup from "../../components/mobile/setup/MobileSetup";
    import MobileOrientation from "../../components/mobile/orientation/MobileOrientation";
    export default {
        name: "Mobile",
        components: {MobileOrientation, MobileSetup},
        data() {
            return {
                debug: false,
                setupMode: 'ready',
            }
        },
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            }
        },
        sockets: {
            mobile_calibrate() {
                this.setupMode = 'calibration'
            },
            mobile_ready() {
                this.setupMode = 'ready'
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
        min-height: 100vh;

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
