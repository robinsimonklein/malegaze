<template>
    <div class="custom-slider">
        <input class="custom-slider__input" :disabled="disabled" type="range" v-model="sliderValue" :min="min" :max="max" :step="step" />
    </div>
</template>

<script>
    export default {
        name: "CustomSlider",
        props: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                sliderValue: 0,
            };
        },
        methods: {
            emitChange(value) {
                this.$emit('change', value)
            }
        },
        watch: {
            sliderValue(value) {
                this.emitChange(value)
            }
        }
    }
</script>

<style lang="scss" scoped>
.custom-slider {
    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;

    &.vertical {
        height: 100%;
        width: 1rem;
        .custom-slider__input {
            width: 50vh;
            transform: rotate(-90deg);
        }
    }


    &__input {
        width: 50vw;
        height: 1rem;
        transform-origin: 35vh 35vh;
        transform: rotate(0deg);
        -webkit-appearance: none;
        background: transparent;
        outline: none;
        border: 1px solid rgba(white, .5);
        border-radius: .1rem;


        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 2.5rem;
            height: 5rem;
            background: #fff;
            border-radius: .1rem;
            cursor: pointer;
        }

        &::-moz-range-thumb {
            width: 2.5rem;
            height: 5rem;
            background: #fff;
            border-radius: .1rem;
            cursor: pointer;
        }

        &::-ms-fill-lower {
            background: red;
        }
    }
}
</style>
