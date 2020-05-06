<template>
    <div class="spectatorScene">
        <div class="spectatorScene__sight" id="spectatorScene__sight"></div>
    </div>
</template>

<script>
    export default {
        name: "spectatorComponent"
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
    }
</style>