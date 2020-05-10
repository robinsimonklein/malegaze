<template>
    <div class="explain">
        <div class="explain__header">
            <div class="explain__header__title">
                Comment se traduit le Male Gaze
            </div>
            <div class="explain__header__line"></div>
            <div class="explain__header__borderBottom"></div>
        </div>
        <div class="explain__list">
            <div class="explain__list__borderTop"></div>
            <div class="explain__list__title">
                La fragmentation
            </div>
            <div class="explain__list__line"></div>
            <div class="explain__list__text">
                Au cinéma le corps de la femme est stylisé et souvent filmé à l’aide de gros plans qui morcellent le corps.
                Le système des champs/contre – champs propose la femme comme objet du regard de l’homme, pas comme sujet.
            </div>
            <div class="explain__list__image"></div>
        </div>

        <div class="explain__list">
            <div class="explain__list__title">
                Caméra subjective
            </div>
            <div class="explain__list__line"></div>
            <div class="explain__list__text">
                On découvre une division genrée de la répartition des rôles. Très souvent la femme porte le spectacle, on est là pour l’admirer.
                Elle est l’objet du regard de l’homme et non le sujet. L’homme est projeté en observateur de la femme et est sujet de l’action.
                C’est lui qui va porter le scénario du film.
            </div>
            <div class="explain__list__image"></div>
        </div>

        <div class="explain__list">
            <div class="explain__list__title">
                Le plaisir scopique du spectateur
            </div>
            <div class="explain__list__line"></div>
            <div class="explain__list__text">
                Le cinéma est en partie pensé pour satisfaire un public masculin. Le spectateur va éprouver du plaisir voyeuriste à regarder la femme,
                et construit sa propre identité par identification avec le héros masculin porteur du même regard à l’intérieur du film.
            </div>
            <div class="explain__list__image"></div>
        </div>

        <div class="explain__borderBottom">
            <p>Nom projet</p>
            <p>2/4</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobileEndExplication"
    }
</script>

<style lang="scss" scoped>
    .explain {


        &__header {
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

            &__borderBottom {
                position: absolute;
                bottom: 0;
                left: 0;

                width: 100%;
                height: 7px;
                background-color: #FF4040;
            }

        }

        &__list {

            background-color: #f2f2f2;
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
                font-size: 26px;

            }

            &__line {
                width: 100%;
                height: 2px;
                background-color: #FF4040;
                margin: 15px 0;
            }

            &__text {
                font-family: 'Roboto', sans-serif;
                font-size: 20px;
                color: #202020;
                font-weight: lighter;
                margin-bottom: 54px;
            }

            &__image {
                width: 150px;
                height: 150px;
                background-color: #FF4040;
                margin: 0 auto;
            }

        }

        &__list:nth-child(2n+0) {
            background-color: #ffff;
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