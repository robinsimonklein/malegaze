<template>
    <div class="wrapper">
        <div class="thanks">
            <h3>Un grand merci</h3>
            <hr/>
            <div class="row">
                <div>
                    <h4>Voix</h4>
                    <p>Julien Laval</p>
                    <p>Malaurie Paulen</p>
                    <p>Sandra Pereira Da Costa</p>
                    <p>Leah Rolin</p>
                </div>
                <div>
                    <h4>Sound design</h4>
                    <p>Cédric Vogel</p>
                </div>
            </div>
        </div>
        <div class="realisation">
            <h3>Réalisé par</h3>
            <hr/>
            <div class="row">
                <div>
                    <h4>Développement</h4>
                    <p>Robin Simonklein</p>
                    <p>Sonia Rb</p>
                    <p>Nicolas Jupiter</p>
                </div>
                <div>
                    <h4>Design</h4>
                    <p>Florian Weidmann</p>
                    <p>Florian Peter</p>
                </div>
            </div>
        </div>
        <footer>
            <img src="@/assets/png/gobelins.png" alt="gobelins campus annecy"/>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'DesktopCredit'
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        max-width: 1440px;
        min-width: 80vw;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;

        .thanks {
            margin-bottom: 100px;
        }

        .thanks, .realisation {
            width: 100%;
        }

        h3 {
            font-weight: normal;
            color: #FF4040;
        }

        hr {
            border: none;
            border-top: 1px solid #FF4040;
            width: 100%;
            margin-bottom: 30px;
        }

        .row {
            display: flex;
            justify-content: space-between;

            div {
                width: 30%;
            }

            h4 {
                text-transform: uppercase;
                margin-bottom: 30px;
                font-weight: normal;
            }
        }

        footer {
            position: absolute;
            bottom: 100px;
            text-align: center;
            left: 0;
            width: 100%;
        }
    }
</style>