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
    import CalibrationCamera from "../../components/mobile/calibration/CalibrationCamera";

    export default {
        name: "MobileSetup",
        components: {CalibrationCamera},
        props: {
            mode: {
                type: String,
                default: 'connection'
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
