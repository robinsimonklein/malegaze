<template>
    <div v-if="debug || !orientationPermission" class="mobile-orientation">
        <div v-if="debug" class="mobile-orientation__debug">
            <p>Orientation permission : {{ orientationPermission }}</p>
            <ul>
                <li>Alpha : {{ orientation.alpha }}</li>
                <li>Beta : {{ orientation.beta }}</li>
                <li>Gamma : {{ orientation.gamma }}</li>
                <li>Screen orient. : {{ screenOrientation }}</li>
            </ul>
        </div>
        <div v-if="!orientationPermission" class="mobile-orientation__permission">
            <h2>Accès à l'orientation nécessaire</h2>
            <OrientationPermissionButton v-on:success="listenOrientation" text="Autoriser" />
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import OrientationPermissionButton from "../setup/OrientationPermissionButton";

    export default {
        name: "MobileOrientation",
        components: {OrientationPermissionButton},
        props: {
            debug: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                orientation: {
                    alpha: 0,
                    beta: 0,
                    gamma: 0,
                },
                screenOrientation: 0,
            }
        },
        computed: {
            ...mapState('mobile', ['orientationPermission'])
        },
        methods: {
            // Device orientation events
            listenOrientation() {
                window.addEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
                window.addEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );
            },
            ignoreOrientation() {
                window.removeEventListener( 'orientationchange', this.onScreenOrientationChangeEvent, false );
                window.removeEventListener( 'deviceorientation', this.onDeviceOrientationChangeEvent, false );
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

            // Check if orientation permission is already granted for iOS 13+
            if (typeof DeviceOrientationEvent.requestPermission === 'function' ) {
                // iOS 13+
                DeviceOrientationEvent.requestPermission().then( ( response ) => {

                    if ( response === 'granted' ) {
                        this.$store.commit('mobile/setOrientationPermission', true)
                        this.listenOrientation()
                    }

                } )
            } else {
                if(this.orientationPermission) {
                    this.listenOrientation()
                }
            }
        },
        beforeDestroy() {
            // Unsuscribe
            this.ignoreOrientation()
        }
    }
</script>

<style lang="scss" scoped>
.mobile-orientation {
    &__debug {

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
