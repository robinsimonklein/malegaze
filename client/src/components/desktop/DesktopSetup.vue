<template>
    <div class="desktop-setup">
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
    import QRCode from './mobileConnection/QRCode';
    import CalibrationScreen from './mobileConnection/CalibrationScreen';
    import appStates from '../../js/appStates';

    export default {
        name: 'DesktopSetup',
        components: {CalibrationScreen, QRCode},
        data() {
            return {
                mode: 'connection'
            };
        },
        computed: {
            mobileUrl() {
                return this.$store.getters['mobile/mobileUrl'];
            }
        },
        sockets: {
            mobile_calibrate() {
                this.mode = 'calibration';
            },
            mobile_ready() {
                this.next();
            }
        },
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.INTRO);
            }
        },
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
