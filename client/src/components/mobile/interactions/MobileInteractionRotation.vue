<template>
    <div class="mobile-interaction interaction-rotation">
        <button @click="done">Rotate</button>
    </div>
</template>

<script>
    export default {
        name: "MobileInteractionRotation",

        methods: {
            done() {
                this.$emit('done')
            }
        }
    }
</script>

<style scoped>

</style>
