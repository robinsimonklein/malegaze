<template>
    <div class="betchdel">
        <div class="betchdel__header">
            <div class="betchdel__header__title">
                Déceler le Male Gaze
            </div>
            <div class="betchdel__header__line"></div>
            <div class="betchdel__header__borderBottom"></div>
        </div>

        <div class="betchdel__content">
            <div class="betchdel__content__container">
                <div class="betchdel__content__borderTop"></div>
                <div class="betchdel__content__title">
                    Le test de <span>Betchdel</span>
                </div>
                <div class="betchdel__content__line"></div>
                <div class="betchdel__content__subTitle">
                    Le test de Betchdel permet de se rendre compte en 3 questions de
                    l’ampleur de la présence du male gaze dans le cinéma.
                </div>
            </div>

            <div class="betchdel__content__list">
                <div class="betchdel__content__list--number">01</div>
                <div class="betchdel__content__list--text">
                    Y’a-t-il au moins deux personnages féminins portant des noms ?
                </div>
            </div>

            <div class="betchdel__content__list">
                <div class="betchdel__content__list--number">02</div>
                <div class="betchdel__content__list--text">
                    Ces deux femmes se parlent-elles ?
                </div>
            </div>

            <div class="betchdel__content__list">
                <div class="betchdel__content__list--number">03</div>
                <div class="betchdel__content__list--text">
                    Leur conversation porte-elle sur un sujet autre qu’un personnage masculin ?
                </div>
            </div>

            <div class="betchdel__content__stats"> <!-- TODO -->

            </div>
        </div>

        <div class="betchdel__borderBottom">
            <p>Nom projet</p>
            <p>4/4</p>
        </div>

    </div>

</template>

<script>
    export default {
        name: "MobileEndBetchdel"
    }
</script>

<style lang="scss" scoped>

    .betchdel {

        &__header {
            background-color: #202020;
            width: 100vw;
            height: 100vh;
            padding: 50px;
            position: relative;

            &__title {
                font-family: "Roboto Mono", sans-serif;
                font-weight: normal;
                font-size: 35px;
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

            &__borderBottom {
                position: absolute;
                bottom: 0;
                left: 0;

                width: 100%;
                height: 7px;
                background-color: #FF4040;
            }

        }

        &__content {

            background-color: #ffff;
            padding-top: 50px;
            position: relative;

            &__container {
                padding: 0 50px;
            }

            &__borderTop {
                position: absolute;
                top: 0;
                left: 0;

                width: 100%;
                height: 7px;
                background-color: #FF4040;
            }

            &__title {
                font-family: "Roboto Mono", sans-serif;
                color: #FF4040;
                font-size: 26px;

                span {
                    font-weight: bold;
                }

            }

            &__line {
                width: 100%;
                height: 2px;
                background-color: #FF4040;
                margin: 15px 0;
            }

            &__subTitle {
                font-family: 'Roboto', sans-serif;
                font-size: 20px;
                color: #202020;
                font-weight: lighter;
                margin-bottom: 20px;
            }

            &__list {

                background-color: #f2f2f2;
                padding: 50px 50px;

                &--number {
                    font-family: 'Roboto Mono', sans-serif;
                    font-size: 30px;
                    color: #FF4040;
                    text-align: center;
                }

                &--text {
                    font-family: 'Roboto', sans-serif;
                    font-size: 25px;
                    color: #202020;
                    text-align: center;
                }

            }

            &__list:nth-child(2n+1) {
                background-color: #ffff;
                border-top: 1px solid #FF4040;
                border-bottom: 1px solid #FF4040;
            }

            &__stats {
                background-color: #707070;
                width: 100%;
                height: 500px;
            }

        }

        &__borderBottom {
            width: 100%;
            height: 50px;
            background-color: #FF4040;
            display: flex;
            justify-content: space-between;
            padding: 0 50px;

            p {
                font-family: "Roboto Mono", sans-serif;
                font-size: 20px;
            }

        }


    }

</style>