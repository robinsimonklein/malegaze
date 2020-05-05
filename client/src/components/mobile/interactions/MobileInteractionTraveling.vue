<template>
    <div class="mobile-interaction interaction-traveling">
        <button @click="done">Traveling</button>
    </div>
</template>

<script>
    export default {
        name: "MobileInteractionFraming",

        methods: {
            done() {
                this.$emit('done')
            }
        }
    }
</script>

<style scoped>

</style>
