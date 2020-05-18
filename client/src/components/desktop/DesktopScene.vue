<template>
    <div id="scene-container" class="scene-container" ref="sceneContainer">
        <CameramanUI v-if="appState === 'cameraman'" />
        <CameramanActressTransition v-if="appState === 'cameraman'" />
        <ActressComponent v-if="appState === 'actress'"/>
        <ActressSpectatorTransition  v-if="appState === 'actress'"/>
        <SpectatorComponent v-if="appState === 'spectator'"/>
    </div>
</template>

<script>
    import ThreeEntryPoint from '../../js/three/ThreeEntryPoint';
    import { mapState } from 'vuex'
    import ActressComponent from './actress/actressComponent';
    import ActressSpectatorTransition from './transition/ActressSpectatorTransition';
    import CameramanActressTransition from './transition/CameramanActressTransition';
    import SpectatorComponent from "./spectator/spectatorComponent";
    import CameramanUI from "./cameraman/CameramanUI";

    export default {
        name: 'DesktopScene',
        components: {
            SpectatorComponent,
            CameramanUI,
            ActressComponent,
            ActressSpectatorTransition,
            CameramanActressTransition
        },
        computed: {
            ...mapState('app', ['appState']),
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
        user-select: none;
    }

    video {
        display: none;
    }
</style>
