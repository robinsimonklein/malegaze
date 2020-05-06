<template>
    <div class="mobile-interaction interaction-zoom">
        <CustomSlider :min="min" :max="max" :step="0.01" :disabled="disabled" @change="checkValue"/>
    </div>
</template>

<script>
    import CustomSlider from "../controls/CustomSlider";
    export default {
        name: "MobileInteractionZoom",
        components: {CustomSlider},
        data() {
            return {
                min: 0,
                max: 1,
                disabled: true
            }
        },
        sockets: {
            mobile_interaction_enable() {
                this.disabled = false
            }
        },
        methods: {
            checkValue(value) {
                if(Number(value )=== 1) this.done()
            },
            done() {
                this.disabled = true
                this.$emit('done')
            }
        },
    }
</script>

<style scoped>

</style>
