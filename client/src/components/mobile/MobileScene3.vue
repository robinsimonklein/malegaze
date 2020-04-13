<template>
    <div class="mobile-scene-3">
        <h1>Mobile Scène 3</h1>
        <button @click="next">Next</button>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "MobileScene3",
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.END)
            }
        }

    }
</script>

<style scoped>

</style>
