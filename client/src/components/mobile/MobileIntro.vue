<template>
    <div class="mobile-intro">
        <h1> Mobile Intro </h1>
        <!-- <button @click="next" class="btn">Next</button> -->
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "MobileIntro",
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.CAMERAMAN)
            }
        }
    }
</script>

<style scoped>

</style>
