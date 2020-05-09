<template>
    <div class="conclusion">
        <div class="conclusion__title">
            Male Gaze Free !
        </div>
        <div class="conclusion__line"></div>
        <div class="conclusion__text">
            <span>Le Male Gaze est omniprésent au cinéma.
                Grâce à la nouvelle catégorie Netflix nom projet découvrez une sélection de film féministe</span>
        </div>
        <div class="conclusion__button">
            <span>C'est parti !</span>
        </div>

        <div class="conclusion__borderBottom"></div>
    </div>
</template>

<script>
    export default {
        name: "MobileEndConclusion"
    }
</script>

<style lang="scss" scoped>

    .conclusion {
        background-color: #202020;
        width: 100vw;
        height: 100vh;
        padding: 50px;
        position: relative;

        &__title {
            font-family: "Roboto Mono", sans-serif;
            font-weight: normal;
            font-size: 40px;
            color: #ffff;
        }

        &__line {
            width: 100%;
            height: 5px;
            background-image: linear-gradient(to right, #ffff 50%, #202020 50%);
            background-position: top;
            background-size: 21px 2px;
            background-repeat: repeat-x;
            margin: 15px 0;
        }

        &__text {
            font-family: 'Roboto', sans-serif;
            font-size: 20px;
            color: #ffff;
            margin-bottom: 80px;
        }

        &__button {

            text-align: center;
            span {
                text-align: center;
                background-color: #FF4040;
                padding: 15px 40px;
                font-family: 'Roboto', sans-serif;
                font-size: 18px;
               color: #ffff;
            }

        }

        &__borderBottom {
            position: absolute;
            bottom: 0;
            left: 0;

            width: 100%;
            height: 7px;
            background-color: #FF4040;
        }

    }

</style>