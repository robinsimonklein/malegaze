<template>
    <div class="desktop-setup">
        <h1>Male Gaze</h1>
        <template v-if="mode==='connection'">
            <h2>Scannez ce QR Code avec votre mobile.</h2>
            <QRCode v-if="mobileUrl" :url="mobileUrl" />
            <a v-if="mobileUrl" :href="mobileUrl" target="_blank">{{ mobileUrl }}</a>
        </template>
        <template v-else-if="mode==='calibration'">
            <CalibrationScreen />
        </template>
    </div>
</template>

<script>
    import QRCode from "./mobileConnection/QRCode";
    import CalibrationScreen from "./mobileConnection/CalibrationScreen";
    import appStates from "../../js/appStates";

    export default {
        name: "DesktopSetup",
        components: {CalibrationScreen, QRCode},
        data() {
            return {
                mode: 'connection'
            }
        },
        computed: {
            mobileUrl() {
                return this.$store.getters['mobile/mobileUrl']
            }
        },
        sockets: {
            mobile_calibrate() {
                this.mode = 'calibration'
            },
            mobile_ready() {
                this.next()
            }
        },
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.INTRO)
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
        mounted() {
            // Skip the setup and go start directly if SKIP_MOBILE_SETUP is true
            if(process.env.VUE_APP_SKIP_MOBILE_SETUP === "true" && process.env.NODE_ENV === 'development'){
                this.next()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .desktop-setup {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;

        h1 {
            margin-bottom: 2rem;
        }
    }
</style>
