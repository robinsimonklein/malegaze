<template>
    <canvas id="scene-canvas" ref="scene-canvas"></canvas>
</template>

<script>
    import SceneManager from '@/js/three/SceneManager'

    export default {
        name: "Scene",
        mounted() {
            console.log(SceneManager)
        }
    }
</script>

<style scoped>

</style>
