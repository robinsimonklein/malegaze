<template>
    <div class="mobile-interaction interaction-traveling">
        <img ref="wheel" src="@/assets/svg/mobile_traveling.svg" />
    </div>
</template>

<script>
    import {gsap} from 'gsap'
    import {Draggable} from 'gsap/Draggable'
    import {normalize} from "../../../js/helpers/Utils";
    import EventManager from "../../../js/event/EventManager";

    export default {
        name: "MobileInteractionFraming",
        data() {
            return {
                progress: 0,
                draggable: null
            }
        },
        sockets: {
            mobile_interaction_enable() {
                this.draggable[0].enable()
            }
        },
        methods: {
            done() {
                this.$emit('done')
            }
        },
        mounted() {
            gsap.registerPlugin(Draggable)

            gsap.set(this.$refs.wheel, {rotation: 360})

            console.log(this.$refs.wheel)
            this.draggable = Draggable.create(this.$refs.wheel, {
                type:"rotation",
                bounds:{minRotation:0, maxRotation:360},
                onDrag: function() {
                    //use current rotation (a value between 0 and 360) to generate a value between 0 and 1 to pass to the progress of the scrollTween
                    const progress = 1 - normalize(this.rotation, 0, 360);
                    EventManager.publish('drag', progress)
                }
            });

            this.draggable[0].disable()

            EventManager.subscribe('drag', (progress) => {
                if(progress === 1) {
                    this.done()
                    this.draggable[0].kill()
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
.interaction-traveling {

}
</style>
