<template>
    <div id="scene-container" class="scene-container" ref="sceneContainer">
        <CameraOverlay v-if="appState === 'cameraman'" />
        <ActressComponent v-if="appState === 'actress'"/>
    </div>
</template>

<script>
    import ThreeEntryPoint from '../../js/three/ThreeEntryPoint';
    import CameraOverlay from "./scene1/CameraOverlay";
    import { mapState } from 'vuex'
    import ActressComponent from "./actress/actressComponent";

    export default {
        name: 'DesktopScene',
        components: {ActressComponent, CameraOverlay},
        computed: {
            ...mapState('app', ['appState']),
            appState() {
                return this.$store.state.app.appState
            }
        },
        mounted() {
            ThreeEntryPoint.init(this.$refs.sceneContainer, `${this.appState}_scenery`)
        },
        beforeDestroy() {
            ThreeEntryPoint.stop()
        }
    }
</script>

<style lang="scss" scoped>
    .scene-container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    video {
        display: none;
    }
</style>
