<template>
    <div class="mobile-scene-1">
        <h1>Mobile Scène 1</h1>
        <button @click="next" class="btn">Next</button>

        <!-- Track the mobile orientation -->
        <MobileOrientation :debug="true" />
    </div>
</template>

<script>
    import appStates from "../../js/appStates";
    import MobileOrientation from "./orientation/MobileOrientation";

    export default {
        name: "MobileScene1",
        components: { MobileOrientation },
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SCENE2)
            }
        }
    }
</script>

<style scoped>

</style>
