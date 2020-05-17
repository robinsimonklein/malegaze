<template>
    <div class="conclusion">
        <div class="conclusion__title">
            Des films non Male Gaze ?
        </div>
        <div class="conclusion__line"></div>
        <div class="conclusion__text">
            <span>Le Male Gaze est omniprésent au cinéma.
                Filmer la femme sous une autre perspective est pourtant possible.
                Nous vous proposons une sélection d’oeuvres filmées sous un autre angle. </span>
        </div>
        <div class="conclusion__button">
            <span>Découvrir</span>
        </div>
        <div class="conclusion__share">
            <span>Partager</span>
            <div class="social-networks">
                <img @click="share" id="twitter" src="@/assets/png/twitter.png"/>
            </div>
        </div>
        <div class="conclusion__borderBottom"></div>
    </div>
</template>

<script>
    export default {
        name: "MobileEndConclusion",
        methods: {
            share() {
                console.log('clicked');
                window.open(`https://twitter.com/share?url=https://male-gaze.com/`,
                    '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            }
        }
    }
</script>

<style lang="scss" scoped>

    .conclusion {
        background-color: #202020;
        width: 100vw;
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

        &__text {
            font-family: 'Roboto', sans-serif;
            font-size: 20px;
            color: #ffff;
            margin-bottom: 80px;
            font-weight: lighter;
        }

        &__button {
            text-align: center;

            span {
                text-align: center;
                background-color: transparent;
                padding: 15px 40px;
                font-family: 'Roboto Mono', sans-serif;
                font-size: 18px;
                text-transform: uppercase;
                color: #FF4040;
                border: 1px solid #FF4040;
                letter-spacing: 5px;
                font-weight: lighter;
            }

        }

        &__share {
            margin-top: 100px;
            display: flex;
            justify-content: space-between;

            span {
                font-size: 18px;
                font-family: "Roboto Mono", sans-serif;
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