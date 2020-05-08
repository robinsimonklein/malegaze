<template>
    <div class="mobile-scene-3">
        <h1>Mobile Scène 3</h1>
        <button @click="next" class="btn">Next</button>

        <!-- Track the mobile orientation -->
        <!-- <MobileOrientation :debug="false" /> -->
    </div>
</template>

<script>
    import appStates from "../../js/appStates";
    import MobileOrientation from "./orientation/MobileOrientation";

    export default {
        name: "MobileScene3",
        components: {MobileOrientation},
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.END)
            }
        }

    }
</script>

<style scoped>

</style>
