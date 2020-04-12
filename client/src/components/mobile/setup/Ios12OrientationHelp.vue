<template>
    <div class="ios-12-orientation-help">
        <span class="ios-12-orientation-help__text">Activons les capteurs de mouvements</span>
        <ol class="ios-12-orientation-help__list">
            <li class="ios-12-orientation-help__step">Ouvrez "Réglages"</li>
            <li class="ios-12-orientation-help__step">Sélectionnez "Safari"</li>
            <li class="ios-12-orientation-help__step">Activez "Mouvements et orientation"</li>
            <li class="ios-12-orientation-help__step">Rechargez la page</li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "Ios12OrientationHelp"
    }
</script>

<style lang="scss" scoped>
    .ios-12-orientation-help {
        position: fixed;
        z-index: 900;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: black;
    }
</style>
