<template>
    <div class="mobile-setup">
        <template v-if="mode === 'connection'">
            <button @click="startCalibration">Commencer</button>
        </template>
        <template v-else-if="mode === 'calibration'">
            <CalibrationCamera v-on:finish="finishCalibration"/>
        </template>
    </div>
</template>

<script>
    import CalibrationCamera from "./setup/CalibrationCamera";

    export default {
        name: "MobileSetup",
        components: {CalibrationCamera},
        data() {
            return {
                mode: 'connection'
            }
        },
        sockets: {
            mobile_calibrate() {
                this.mode = 'calibration'
            },
            mobile_ready() {
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
        }
    }
</script>

<style lang="scss" scoped>
    button {
        background: white;
        color: black;
        padding: 1rem;
        border-radius: 1rem;
        border: none
    }
</style>
