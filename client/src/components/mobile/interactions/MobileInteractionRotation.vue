<template>
    <div class="mobile-interaction interaction-rotation">
        <CustomSlider class="interaction-rotation__slider" :min="min" :max="max" :step="0.01" :disabled="disabled" @change="checkValue"/>
    </div>
</template>

<script>
    import CustomSlider from "../controls/CustomSlider";
    export default {
        name: "MobileInteractionRotation",
        components: {CustomSlider},
        data() {
            return {
                min: 0,
                max: 1,
                disabled: false
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

<style lang="scss" scoped>
.interaction-rotation {
    &__slider {
        transform: rotate(180deg);
    }
}
</style>
