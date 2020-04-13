<template>
    <div id="scene-container" class="scene-container" ref="sceneContainer"></div>
</template>

<script>
    import threeEntryPoint from "../../js/three/threeEntryPoint";

    export default {
        name: "DesktopScene",
        mounted() {
            threeEntryPoint(this.$refs.sceneContainer)
        }
    }
</script>

<style lang="scss" scoped>
.scene-container {
    width: 100vw;
    height: 100vh;
}
</style>
