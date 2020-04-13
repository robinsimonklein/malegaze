<template>
    <div class="mobile-storyboard">
        <h1>Mobile Storyboard</h1>
        <button @click="next" class="btn">Next</button>
    </div>
</template>

<script>
    import appStates from "../../js/appStates";

    export default {
        name: "MobileStoryboard",
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.SCENE1)
            }
        }
    }
</script>

<style scoped>

</style>
