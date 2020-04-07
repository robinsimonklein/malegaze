<template>
    <div class="home">
        <h1>Male Gaze</h1>
        <MobileConnectionSetup/>
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
    }
</script>
