<template>
    <div class="custom-slider" :class="orientation">
        <input class="custom-slider__input" :disabled="disabled" type="range" v-model="sliderValue" :min="min" :max="max" :step="step" />
        <img class="slider-arrow" src="@/assets/png/arrows.png" alt="go up"/>
        <div class="slider-filled" v-bind:style="{'width': 'calc(100% * ' + sliderValue + ')'}"></div>
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
            orientation: {
                type: String,
                default: 'top'
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
    width: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.top {
        transform: rotate(-90deg);
        .custom-slider__input {
            width: 50vh;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }

    .slider-arrow {
        position: absolute;
        bottom: -200%;
        left: 50%;
        animation: goUp 1s infinite;
        // width: 100%;
        // height: 100%;
        transform: rotate(90deg);
    }

    .slider-filled {
        background: #FF4040;
        z-index: -1;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
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

    @keyframes goUp {
        from {
            transform: translateX(0) rotate(90deg);
            opacity: 1;
        }
        to {
            transform: translateX(10px) rotate(90deg);
            opacity: 0.5;
        }
    }
}
</style>
