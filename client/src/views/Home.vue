<template>
    <div class="home">
        <template v-if="!started">
            <MobileConnectionSetup v-on:ready="start"/>
        </template>
        <template v-else>
            <h2>L'expérience peut démarrer...</h2>
        </template>
    </div>
</template>

<script>
    // @ is an alias to /src

    import MobileConnectionSetup from "../components/mobileConnection/MobileConnectionSetup";

    export default {
        name: 'Home',
        components: {
            MobileConnectionSetup
        },
        data() {
            return {
                started: false
            }
        },
        methods: {
            start() {
                this.started = true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .home {
        min-height: 100vh
    }
</style>
