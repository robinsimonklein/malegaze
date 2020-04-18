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
    height: 70vh;
    width: 1rem;

    &__input {
        width: 70vh;
        height: 1rem;
        margin: 0;
        transform-origin: 35vh 35vh;
        transform: rotate(-90deg);
        -webkit-appearance: none;
        background: #777;
        outline: none;
        border-radius: .1rem;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 1rem;
            height: 2.2rem;
            background: #fff;
            border-radius: .1rem;
            cursor: pointer;
            box-shadow: -.2rem 0 .2rem rgba(black, .5) ;
        }

        &::-moz-range-thumb {
            width: 1rem;
            height: 2.2rem;
            background: #fff;
            border-radius: .1rem;
            cursor: pointer;
            box-shadow: 0 .5rem rgba(black, .5) ;
        }
    }
}
</style>
