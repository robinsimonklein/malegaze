<template>
    <div class="intro">
        <div class="intro__header">
            <div class="intro__header__title">
                <p>Le Male Gaze</p>
                <p>En 3 minutes</p>
            </div>
            <div class="intro__header__subTitle">
                Un concept théorisé <br>
                par Laura Mulvey
            </div>
            <div class="intro__header__line"></div>
            <div class="intro__header__subTitle">
                Comment se traduit <br>
                le Male gaze
            </div>
            <div class="intro__header__line"></div>
            <div class="intro__header__subTitle">
                L’impact du Male Gaze
            </div>
            <div class="intro__header__line"></div>
            <div class="intro__header__borderBottom"></div>
            <div class="intro__header__subTitle">
                Des films non Male Gaze ?
            </div>
        </div>

        <div class="intro__presentation">
            <div class="intro__presentation__borderTop"></div>
            <div class="intro__presentation__title">
                Un concept <br>
                théorisé par <br>
                <span>Laura Mulvey</span>
            </div>
            <div class="intro__presentation__line"></div>
            <div class="intro__presentation__description">
                Le male gaze, “regard masculin” en français, définit un cinéma qui s’attarde sur le physique de la femme.
                Il est théorisé par Laura Mulvey, dans son essai « Visual pleasure and narrative cinema » en 1975.
            </div>
            <div class="intro__presentation__description">
                50 ans après avoir été théorisé, ce concept est toujours une norme cinématographique en 2020.
            </div>
        </div>
        <div class="intro__borderBottom">
            <p>1/4</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobileEndIntro"
    }
</script>

<style lang="scss" scoped>
    .intro {

        &__header {

            background-color: #202020;
            width: 90vw;
            padding: 50px 0;
            margin: 0 auto;
            position: relative;

            &__title {
                font-family: "Roboto Mono", sans-serif;
                font-weight: 500;
                font-size: 38px;
                color: #ffff;
                padding-bottom: 140px;

                p {
                    margin: 0;
                }

                p:last-of-type {
                    text-transform: uppercase;
                    font-size: 18px;
                }
            }

            &__subTitle {
                font-family: "Roboto Mono", sans-serif;
                font-size: 18px;
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

                width: 100vw;
                margin-left: -5vw;
                height: 7px;
                background-color: #FF4040;
            }

        }

        &__presentation {
            width: 100vw;
            //background-color: deeppink;
            background-color: #ffff;
            padding: 50px;
            position: relative;

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
                font-size: 30px;

                span {
                    font-weight: bold;
                }
            }

            &__line {
                width: 100%;
                height: 2px;
                background-color: #FF4040;
                margin: 18px 0;
            }

            &__description {
                font-family: "Roboto", sans-serif;
                font-size: 20px;
                font-weight: 200;
                color: #202020;
                margin-bottom: 30px;
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
                margin: 0;
                align-self: center;
            }

        }

    }
</style>