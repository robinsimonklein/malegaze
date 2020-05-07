<template>
    <div class="actressScene">
        <div class="actressScene__tuto" id="actressScene__tuto">
            <div class="actressScene__tuto__content">
                <h2>Repousse les regards</h2>
                <p>Vise puis tape dans la zone definie pour repousser les statues</p>
                <img src="icon/tutorial/tutorial_icon_hit.svg" alt="phone"/>
            </div>
        </div>
        <div class="actressScene__sight" id="actressScene__sight"></div>
    </div>
</template>

<script>
    export default {
        name: "actressComponent",
        methods: {
            init() {
               var overlay = document.getElementById('actressScene__tuto');
                var sight = document.getElementById('actressScene__sight');

                setTimeout(() => {
                   overlay.style.display = 'none';
                    sight.style.display = 'block';
                },5000);

            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss" scoped>

    .actressScene {

        &__tuto {
            position: fixed;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.6);

            &__content {
                position: fixed;
                left: 50%;
                top: 50%;

                width: 100%;
                text-align: center;
                transform: translate(-50%, -50%);
                font-family: "Roboto Mono", sans-serif;
                color: #FF4040;
                h2 {
                    letter-spacing: 10px;
                    font-size: 60px;
                    font-weight: bold;
                    text-transform: uppercase;
                }

                p {
                    font-size: 24px;
                    letter-spacing: 5px;
                    text-transform: uppercase;
                    margin-bottom: 90px;
                }
            }
        }

        &__sight {
            display: none;
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