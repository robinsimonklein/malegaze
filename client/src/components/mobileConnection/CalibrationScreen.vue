<template>
    <div class="calibration-screen">
        <img class="calibration-screen__target" src="@/assets/svg/calibration-target.svg" />
        <p class="calibration-screen__text">Visez l'écran avec votre téléphone.</p>
    </div>
</template>

<script>
    export default {
        name: "CalibrationScreen"
    }
</script>

<style lang="scss" scoped>

    .calibration-screen {
        &__target {
            height: 40vh
        }
    }

    p {
        margin-top: 1rem;
    }
</style>
