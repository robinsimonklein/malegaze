<template>
    <div class="mobile-scene-1">
        <h1>Mobile Scène 1</h1>
        <button @click="next" class="btn">Next</button>
        <ZoomSlider class="mobile-scene-1__zoom" />

        <!-- Track the mobile orientation -->
        <MobileOrientation :debug="false" />
    </div>
</template>

<script>
    import appStates from "../../js/appStates";
    import MobileOrientation from "./orientation/MobileOrientation";
    import ZoomSlider from "./controls/ZoomSlider";

    export default {
        name: "MobileScene1",
        components: {ZoomSlider, MobileOrientation },
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SCENE2)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-scene-1 {
        &__zoom {
            margin: 1rem 0;
        }
    }
</style>
