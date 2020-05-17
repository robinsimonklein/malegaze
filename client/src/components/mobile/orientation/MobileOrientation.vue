<template>
    <div v-if="debug || !orientationPermission" class="mobile-orientation">
        <div v-if="debug" class="mobile-orientation__debug">
            <p>Orientation permission : {{ orientationPermission }}</p>
            <ul>
                <li>Alpha : {{ orientation.alpha }}</li>
                <li>Beta : {{ orientation.beta }}</li>
                <li>Gamma : {{ orientation.gamma }}</li>
                <li>Screen orient. : {{ orientation.screen }}</li>
            </ul>
        </div>
        <div v-if="!orientationPermission" class="mobile-orientation__permission">
            <Popup class="popup">
                <h2>Accès à l'orientation nécessaire</h2>
                <OrientationPermissionButton v-on:success="listenOrientation" text="Autoriser" />
            </Popup>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import OrientationPermissionButton from "../setup/OrientationPermissionButton";
    import Popup from "../../Popup";
    import EventManager from "../../../js/event/EventManager";

    export default {
        name: "MobileOrientation",
        components: {Popup, OrientationPermissionButton},
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
                    screen: 0
                },
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
                this.orientation.screen = window.orientation || 0
            },
            onDeviceOrientationChangeEvent(e) {
                this.orientation.alpha = e.alpha;
                this.orientation.beta = e.beta;
                this.orientation.gamma = e.gamma;
                this.orientation.screen = window.orientation || 0
                this.emitOrientation();
            },
            emitOrientation() {
                EventManager.publish('mobile:orientation', this.orientation)
                this.$socket.emit('mobile_orientation', this.orientation)
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

    h2 {
        text-align: center;
        color: white;
        font-size: 18px;
        width: 80%;
        margin: auto auto 30px auto;
    }

    button {
        background: white;
        color: black;
        width: 80%;
        margin: auto;
        padding: 15px;
        border: none;
    }
}
</style>
