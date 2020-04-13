<template>
    <div class="mobile-scene-2">
        <h1>Mobile Scène 2</h1>
        <button @click="next" class="btn">Next</button>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "MobileScene2",
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SCENE3)
            }
        }

    }
</script>

<style scoped>

</style>
