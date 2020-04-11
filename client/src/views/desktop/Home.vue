<template>
    <div class="home">
        <template v-if="!started">
            <MobileConnectionSetup v-on:ready="start"/>
        </template>
        <template v-else>
            <h2>L'expérience peut démarrer...</h2>
            <ul>
                <li>alpha: {{ orientation.alpha }}</li>
                <li>beta: {{ orientation.beta }}</li>
                <li>gamma: {{ orientation.gamma }}</li>
            </ul>
        </template>
    </div>
</template>

<script>
    // @ is an alias to /src

    import MobileConnectionSetup from "../../components/mobileConnection/MobileConnectionSetup";
    import { mapState } from 'vuex'

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
        computed: {
            ...mapState('mobile', ['orientation'])
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
