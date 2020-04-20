<template>
    <div class="desktop-end">
        <div class="definition">
            <h1>Male Gaze (n.m.)</h1>
            <p>Le male gaze, désigne le fait que la culture visuelle dominante (magazines, photographie, cinéma, publicité, jeu vidéo, bande dessinée, etc.) imposerait au public d'adopter une perspective d'homme hétérosexuel.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DesktopEnd",
    }
</script>

<style lang="scss" scoped>
.desktop-end {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .definition {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50vw;
    }
}
</style>
