<template>
    <div class="mobile-scene-1">
        <div class="mobile-scene-1__infos">
            <span>Mobile Scène 1</span>
            <button @click="next" class="btn">Next</button>
        </div>
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
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;

        &__infos {
            position: absolute;
            top: .5rem;
            right: .5rem;
            display: flex;
            flex-direction: column;
        }
    }
</style>
