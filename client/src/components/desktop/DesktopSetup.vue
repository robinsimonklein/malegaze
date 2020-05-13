<template>
    <div class="desktop-setup">
        <template v-if="mode==='connection'">
            <ConnectionScreen />
        </template>
        <template v-else-if="mode==='calibration'">
            <CalibrationScreen />
        </template>
    </div>
</template>

<script>
    import CalibrationScreen from './mobileConnection/CalibrationScreen';
    import appStates from '../../js/appStates';
    import ConnectionScreen from "./mobileConnection/ConnectionScreen";

    export default {
        name: 'DesktopSetup',
        components: {ConnectionScreen, CalibrationScreen},
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
