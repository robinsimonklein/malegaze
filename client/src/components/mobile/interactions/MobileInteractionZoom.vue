<template>
    <div class="mobile-interaction interaction-zoom" :class="{'success': success}">
        <div ref="zone" class="interaction-zoom__zone">
            <div class="interaction-zoom__target" :style="`height: ${size}%; width: ${size}%;`">
                <div class="interaction-zoom__target-corner interaction-zoom__target-corner--tl"></div>
                <div class="interaction-zoom__target-corner interaction-zoom__target-corner--tr"></div>
                <div class="interaction-zoom__target-corner interaction-zoom__target-corner--bl"></div>
                <div class="interaction-zoom__target-corner interaction-zoom__target-corner--br"></div>
                <div class="interaction-zoom__target--center"></div>
            </div>
        </div>
    </div>
</template>

<script>
    // import CustomSlider from "../controls/CustomSlider";
    import Hammer from 'hammerjs'
    import {normalize} from "../../../js/helpers/Utils";

    export default {
        name: "MobileInteractionZoom",
        // components: {CustomSlider},
        data() {
            return {
                min: 0,
                max: 1,
                disabled: false,
                size: 30,
                minimumSize: 30,
                lastSize: 30,
            }
        },
        sockets: {
            mobile_interaction_enable() {
                this.disabled = false
            }
        },
        computed: {
            success() {
                return this.size === 100
            }
        },
        methods: {
            checkValue(value) {
                if (Number(value) === 1) this.done()
            },
            done() {
                this.disabled = true
                this.$emit('done')
            }
        },
        mounted() {

            let zone = this.$refs.zone
            let hammer = new Hammer(zone)
            hammer.get('pinch').set({enable: true});

            hammer.on('pinch', (e) => {
                if(this.disabled) return
                if(!(this.size < 100)) {
                    this.done()
                }

                const size = Math.round(this.lastSize + (normalize(e.scale, 1, 3) * (100 - this.minimumSize)))

                if(size < 30 || size > 100) return
                this.size = size


                this.$socket.emit('mobile_interaction', {
                    type: 'zoom',
                    value: normalize(this.size, this.minimumSize, 100)
                })

            })

            hammer.on('pinchend', () => {
                this.lastSize = this.size
                if(this.size === 100) {
                    this.disabled = true
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .interaction-zoom {
        &__zone {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 80vh;
            width: 80vw;
            border: 4px solid white;
            padding: 1rem;
        }

        &__target {
            position: relative;
            height: 30%;
            width: 30%;

            &-corner {
                position: absolute;
                height: 1rem;
                width: 1rem;
                border-color: white;
                border-style: solid;
                border-width: 0;

                .success &{
                    border-color: $color-success;
                }

                &--tl {
                    top: 0;
                    left: 0;
                    border-top-width: 4px;
                    border-left-width: 4px;
                }
                &--tr {
                    top: 0;
                    right: 0;
                    border-top-width: 4px;
                    border-right-width: 4px;
                }
                &--bl {
                    bottom: 0;
                    left: 0;
                    border-bottom-width: 4px;
                    border-left-width: 4px;
                }
                &--br {
                    bottom: 0;
                    right: 0;
                    border-bottom-width: 4px;
                    border-right-width: 4px;
                }
            }

            &--center {
                width: 100%;
                height: 100%;

                &:before {
                    content: '';
                    position: absolute;
                    top: calc(50% - 2px);
                    left: calc(50% - .5rem);
                    height: 4px;
                    width: 1rem;
                    background: white;

                    .success &{
                        background: $color-success;
                    }
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: calc(50% - .5rem);
                    left: calc(50% - 2px);
                    height: 1rem;
                    width: 4px;
                    background: white;

                    .success &{
                        background: $color-success;
                    }
                }
            }
        }


    }
</style>
