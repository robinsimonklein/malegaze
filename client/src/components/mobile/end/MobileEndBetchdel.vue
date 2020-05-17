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

            <div class="betchdel__content__stats">
                <div class="betchdel__content__stats__title">
                    Sur <strong>8000 films</strong> sortis entre 2016 et 2018
                </div>
                <img src="@/assets/png/end_diagramme.png" alt="pie_chart"/>
                <div class="betchdel__content__stats__title">
                    <p>
                        <strong>40%</strong><br/> ne passent pas le test
                    </p>
                </div>
                <p class="betchdel__content__stats__subtitle">
                    Des films qui passent le test ?
                </p>
                <img src="@/assets/png/goDown.png" alt="go down"/>
            </div>
        </div>

        <div class="betchdel__borderBottom">
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
            height: 60vh;
            padding: 50px;
            position: relative;

            &__title {
                font-family: "Roboto Mono", sans-serif;
                font-weight: normal;
                font-size: 35px;
                color: #ffff;
                margin-top: 30px;
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
                display: flex;
                background-color: #f2f2f2;
                padding: 50px;
                justify-content: center;

                &--number {
                    font-family: 'Roboto Mono', sans-serif;
                    font-size: 25px;
                    color: #FF4040;
                    text-align: left;
                    margin-right: 30px;
                }

                &--text {
                    font-family: 'Roboto Mono', sans-serif;
                    font-size: 18px;
                    color: #202020;
                    text-align: left;
                }

            }

            &__list:nth-child(2n+1) {
                background-color: #ffff;
                border-top: 1px solid #FF4040;
                border-bottom: 1px solid #ff4040;
            }

            &__stats {
                background-color: #FFF5F5;
                width: 100%;
                padding: 50px 50px 0 50px;
                text-align: center;
                font-size: 20px;

                &__title {
                    color: black;
                    font-family: "Roboto Mono", sans-serif;

                    strong {
                        color: #FF4040;
                        font-size: 35px;
                        font-weight: normal;
                    }
                }

                p {
                    margin: 0;
                }

                img:first-of-type {
                    margin: 30px;
                }

                &__subtitle {
                    color: #FF4040;
                    font-size: 20px;
                    margin-top: 50px !important;
                    margin-bottom: 20px !important;
                }

                img:last-of-type {
                    margin-bottom: 20px;
                    animation: goDown 1s infinite alternate;
                }
            }

        }

        &__borderBottom {
            width: 100%;
            height: 50px;
            background-color: #FF4040;
            display: flex;
            justify-content: flex-end;
            padding: 0 50px;

            p {
                font-family: "Roboto Mono", sans-serif;
                font-size: 20px;
            }

        }
    }

    @keyframes goDown {
        from {
            transform: translateY(0);
        }

        to {
            transform: translateY(10px);
        }
    }

</style>