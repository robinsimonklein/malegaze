<template>
    <div class="calibration-screen">
        <img class="calibration-screen__target" src="@/assets/png/calibration_target.png" />
        <p class="calibration-screen__text">Tenez votre téléphone à la verticale. <br> Visez l'écran pour le calibrer et commencer l'expérience.</p>
    </div>
</template>

<script>
    export default {
        name: "CalibrationScreen"
    }
</script>

<style lang="scss" scoped>

    .calibration-screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &__target {
            max-height: 500px;
            height: 70vh
        }
    }

    p {
        font-size: 22px;
        letter-spacing: 2px;
        margin-top: 1rem;
        text-align: center;
    }
</style>
