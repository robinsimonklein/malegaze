<template>
    <div class="zoom-slider">
        <input class="zoom-slider__input" v-model="focalLength" type="range" min="24" max="150" step="0.1" />
    </div>
</template>

<script>
    export default {
        name: "ZoomSlider",
        data() {
            return {
                focalLength: 24
            };
        },
        methods: {
            emitControls() {
                this.$socket.emit('mobile_controls', {focalLength: this.focalLength});
            }
        },
        watch: {
            focalLength() {
                this.emitControls();
            }
        }
    }
</script>

<style lang="scss" scoped>
.zoom-slider {
    height: 100%;
    width: 1rem;

    &__input {
        width: 50vh;
        height: 1rem;
        transform-origin: 35vh 35vh;
        transform: rotate(-90deg);
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
    }
}
</style>
