<template>
    <div class="mobile-scene-2">
        <h1>Mobile Scène 2</h1>
        <button @click="next" class="btn">Next</button>

        <!-- Track the mobile orientation -->
        <MobileOrientation :debug="false" />
    </div>
</template>

<script>
    import appStates from "../../js/appStates";
    import MobileOrientation from "./orientation/MobileOrientation";

    export default {
        name: "MobileScene2",
        components: {MobileOrientation},
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SCENE3)
            }
        }

    }
</script>

<style scoped>

</style>
