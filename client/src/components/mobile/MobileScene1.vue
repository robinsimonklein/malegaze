<template>
    <div class="mobile-scene-1">
        <h1>Mobile Scène 1</h1>
        <button @click="next" class="btn">Next</button>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "MobileScene1",
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SCENE2)
            }
        }

    }
</script>

<style scoped>

</style>
