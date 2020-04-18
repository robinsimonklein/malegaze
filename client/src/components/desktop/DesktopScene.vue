<template>
    <div id="scene-container" class="scene-container" ref="sceneContainer">
        <CameraOverlay />
    </div>
</template>

<script>
    import threeEntryPoint from '../../js/three/threeEntryPoint';
    import CameraOverlay from "./scene1/CameraOverlay";

    export default {
        name: 'DesktopScene',
        components: {CameraOverlay},
        computed: {
            appState() {
                return this.$store.state.app.appState
            }
        },
        mounted() {
            threeEntryPoint(this.$refs.sceneContainer);
        }
    }
</script>

<style lang="scss" scoped>
.scene-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>s
