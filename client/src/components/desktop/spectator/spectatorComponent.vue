<template>
    <div class="spectatorScene">
        <div ref="sight" class="spectatorScene__sight" id="spectatorScene__sight"></div>
        <div ref="fadingOut" class="fading-out"></div>
    </div>
</template>

<script>
    import EventManager from '../../../js/event/EventManager';

    export default {
        name: 'spectatorComponent',
        created() {
            EventManager.subscribe('fadeEnding', () => {
                this.$refs.fadingOut.classList.add('active');
            });

            EventManager.subscribe('spectatorDetected', () => {
                this.$refs.sight.classList.add('active');
            });

            EventManager.subscribe('spectatorNotDetected', () => {
                this.$refs.sight.classList.remove('active');
            });
        }
    }
</script>

<style lang="scss" scoped>
    .spectatorScene {
        &__sight {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 25px;
            height: 25px;
            border-radius: 50px;
            background-color: white;
            transition: background-color .3s ease;

            &.active {
                transition: background-color .3s ease;
                background-color: $color-primary;
            }
        }
        .fading-out {
            background: black;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 999;
            opacity: 0;
            transition: all 0.5s;

            &.active {
                opacity: 1;
            }
        }
    }
</style>
