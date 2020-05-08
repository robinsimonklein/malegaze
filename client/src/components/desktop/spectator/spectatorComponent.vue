<template>
    <div class="spectatorScene">
        <div class="spectatorScene__sight" id="spectatorScene__sight"></div>
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
        }
    }
</script>

<style lang="scss" scoped>
    .spectatorScene {
        &__sight {
            display: block;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 5px;
            height: 25px;
            background-color: #ffffff;

            &::after {
                content : '';
                width: 5px;
                height: 25px;
                background-color: #ffffff;
                transform: rotate(90deg);
                position: fixed;
                top: 0;
                left: 0;
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