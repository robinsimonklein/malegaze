<template>
    <div v-if="debug" class="mobile-orientation">
        <p>Orientation permission : {{ orientationPermission }}</p>
        <ul>
            <li>Alpha : {{ orientation.alpha }}</li>
            <li>Beta : {{ orientation.beta }}</li>
            <li>Gamma : {{ orientation.gamma }}</li>
            <li>Screen orient. : {{ screenOrientation }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MobileOrientation",
        props: {
            debug: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                orientationPermission: false,
                orientation: {
                    alpha: 0,
                    beta: 0,
                    gamma: 0,
                },
                screenOrientation: 0,
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
            this.listenOrientation()
        }
    }
</script>

<style scoped>

</style>
