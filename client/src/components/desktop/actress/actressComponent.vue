<template>
    <div class="actressScene">
        <div class="actressScene__tuto">
            <div class="actressScene__tuto__content">
                <h2>Repousse les regards</h2>
                <p>Vise puis tape dans la zone definie pour repousser les statues</p>
            </div>
        </div>
        <!--<div class="actressScene__sight"></div>-->
    </div>
</template>

<script>
    export default {
        name: "actressComponent"
    }
</script>

<style lang="scss" scoped>

    .actressScene {

        &__tuto {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);

            &__content {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);

                h2 {
                    //font-family: ;
                }

                p {

                }

                svg {

                }
            }
        }

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