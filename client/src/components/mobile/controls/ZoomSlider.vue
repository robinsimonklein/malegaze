<template>
    <div class="zoom-slider">
        <input v-model="focalLength" type="range" min="24" max="150" step="0.1" />
    </div>
</template>

<script>
    export default {
        name: "ZoomSlider",
        data() {
            return {
                focalLength: 24
            }
        },
        methods: {
            emitControls() {
                this.$socket.emit('mobile_controls', {focalLength: this.focalLength})
            }
        },
        watch: {
            focalLength() {
                this.emitControls()
            }
        }
    }
</script>

<style lang="scss" scoped>
.zoom-slider {

}
</style>
