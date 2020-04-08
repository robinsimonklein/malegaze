<template>
    <div class="mobile">
        <template v-if="mode === 'connection'">
            <p>ID : {{ this.mobileId }}</p>
            <button @click="startCalibration">Commencer</button>
        </template>
        <template v-else-if="mode === 'calibrate'">
            <CalibrationCamera v-on:finish="finishCalibration"/>
        </template>
        <template v-else-if="mode === 'ready'">
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
    import CalibrationCamera from "../../components/mobile/CalibrationCamera";
    export default {
        name: "Mobile",
        components: {CalibrationCamera},
        data() {
            return {
                mode: 'connection',
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
                this.mode = 'calibrate'
            },
            mobile_ready() {
                this.listenOrientation()
                this.mode = 'ready'
            }
        },
        methods: {
            startCalibration(){
                this.$socket.emit('mobile_calibrate')
            },
            finishCalibration() {
                this.$socket.emit('mobile_ready')
            },

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
                this.$socket.emit('device_orientation', this.orientation)
            },
            emitScreenOrientation() {
                this.$socket.emit('screen_orientation', this.screenOrientation)
            },
        },
        created() {
            this.$store.commit('mobile/setMobileId', this.mobileId)
            this.$socket.emit('join_mobile_room', this.mobileId)
        }
    }
</script>

<style lang="scss" scoped>
    .mobile {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;

        button {
            background: white;
            color: black;
            padding: 1rem;
            border-radius: 1rem;
            border: none
        }
    }
</style>
