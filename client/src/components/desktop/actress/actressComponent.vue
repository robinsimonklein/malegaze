<template>
    <div class="actressScene">
        <div class="actressScene__sight"></div>
    </div>
</template>

<script>
    export default {
        name: "actressComponent"
    }
</script>

<style lang="scss" scoped>

    .actressScene {

        &__sight {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 5px;
            height: 25px;
            background-color: darkred;

            &::after {
                content : '';
                width: 5px;
                height: 25px;
                background-color: darkred;
                transform: rotate(90deg);
                position: fixed;
                top: 0;
                left: 0;
            }

        }
    }

</style>