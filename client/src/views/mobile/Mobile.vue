<template>
    <div class="mobile">
        <p class="mobile__debug">ID : {{ this.mobileId }}</p>
        <MobileSetup v-if="setupMode !== 'ready'" :mode="setupMode"/>
        <template v-if="setupMode === 'ready'">
            <h1>Mobile Ready !</h1>
            <p>Orientation permission : {{ orientationPermission }}</p>
            <ul>
                <li>Alpha : {{ orientation.alpha }}</li>
                <li>Beta : {{ orientation.beta }}</li>
                <li>Gamma : {{ orientation.gamma }}</li>
                <li>Screen orient. : {{ screenOrientation }}</li>
            </ul>
        </template>
    </div>
</template>

<script>
    import MobileSetup from "../../components/mobile/MobileSetup";
    export default {
        name: "Mobile",
        components: {MobileSetup},
        data() {
            return {
                setupMode: 'connection',
                orientation: {
                    alpha: 0,
                    beta: 0,
                    gamma: 0,
                },
                screenOrientation: 0,
                orientationPermission: false
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
                this.listenOrientation()
                this.setupMode = 'ready'
            }
        },
        methods: {
            // Device orientation events
            listenOrientation() {
                this.orientationPermission = true
                window.addEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
                window.addEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );
            },
            onScreenOrientationChangeEvent() {
                this.screenOrientation = window.orientation || 0
                this.emitScreenOrientation()
            },
            onDeviceOrientationChangeEvent(e) {
                this.orientation.alpha = e.alpha;
                this.orientation.beta = e.beta;
                this.orientation.gamma = e.gamma;
                this.emitOrientation();
            },
            emitOrientation() {
                this.$socket.emit('mobile_orientation', this.orientation)
            },
            emitScreenOrientation() {
                this.$socket.emit('mobile_screen_orientation', this.screenOrientation)
            },
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
