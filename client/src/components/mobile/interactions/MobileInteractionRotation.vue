<template>
    <div class="mobile-interaction interaction-rotation">
        <img src="@/assets/svg/mobile_rotation.svg" />
    </div>
</template>

<script>
    import EventManager from "../../../js/event/EventManager";
    import {normalize} from "../../../js/helpers/Utils";
    import {MathUtils} from "three";
    export default {
        name: "MobileInteractionRotation",
        data() {
            return {
                min: 0,
                max: 1,
                disabled: false,
                alpha: null,
                offset: undefined,
                event: null
            }
        },
        sockets: {
            mobile_interaction_enable() {
                this.disabled = false
            }
        },
        methods: {
            checkValue(value) {

                this.$socket.emit('mobile_interaction', {
                    type: 'rotation',
                    value: value
                })

                if(Number(value )=== 1) this.done()

            },
            done() {
                this.disabled = true
                this.$emit('done')
            }
        },
        computed: {
            value() {
                const max = 50
                if(this.alpha > 180) {
                    return 0
                }else if(this.alpha > max){
                    return 1
                }else {
                    return normalize(this.alpha, 0, max)
                }
            }
        },
        mounted() {
            this.event = EventManager.subscribe('mobile:orientation', (orientation) => {
                if(this.offset === undefined) this.offset = orientation.alpha > 180 ? orientation.alpha - MathUtils.radToDeg(Math.PI*2) : orientation.alpha
                this.alpha = orientation.alpha ?? 0

                this.checkValue(this.value)
            })
        },
        beforeDestroy() {
            this.event.unsubscribe()
        }
    }
</script>

<style lang="scss" scoped>
.interaction-rotation {
    display: flex;
    flex-direction: column;

    img {
        max-height: 80vh;
        max-width: 80vw
    }
}
</style>
