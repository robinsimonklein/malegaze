<template>
    <div class="desktop-setup">
        <template v-if="mode==='connection'">
            <ConnectionScreen/>
        </template>
        <template v-else-if="mode==='setup'">
            <SetupScreen/>
        </template>
        <template v-else-if="mode==='calibration'">
            <CalibrationScreen/>
        </template>
    </div>
</template>

<script>
    import CalibrationScreen from './mobileConnection/CalibrationScreen';
    import appStates from '../../js/appStates';
    import ConnectionScreen from './mobileConnection/ConnectionScreen';
    import SetupScreen from './mobileConnection/SetupScreen';
    import gsap from 'gsap'

    export default {
        name: 'DesktopSetup',
        components: {ConnectionScreen, CalibrationScreen, SetupScreen},
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
            mobile_orientation() {
                this.mode = 'setup';
            },
            mobile_calibrate() {
                this.mode = 'calibration';
            },
            mobile_ready() {
                this.next();
            }
        },
        methods: {
            next() {
                const tl = new gsap.timeline()
                tl.to('.desktop-setup', {duration: 1, ease: 'power2.in', alpha: 0})
                tl.call(() => {
                    this.$socket.emit('state_request', appStates.INTRO);
                })
            }
        },
        mounted() {
            const tl = new gsap.timeline()
            tl.from('.desktop-setup', {duration: 1, ease: 'power2.out', alpha: 0})
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
