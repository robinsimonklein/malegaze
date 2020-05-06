<template>
    <div class="mobile-interaction interaction-zoom">
        <button @click="done">Zoom</button>
    </div>
</template>

<script>
    export default {
        name: "MobileInteractionZoom",

        methods: {
            done() {
                this.$emit('done')
            }
        }
    }
</script>

<style scoped>

</style>
