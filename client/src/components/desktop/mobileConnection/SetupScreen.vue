<template>
    <div class="setup-screen">
        <div class="setup-screen__illustration">
            <div class="phone-top"></div>
            <div class="phone-bottom"></div>
        </div>
        <p class="setup-screen__text">Votre smartphone vous servira tout au<br/> long de l’expérience</p>
    </div>
</template>

<script>
    export default {
        name: "SetupScreen"
    }
</script>

<style lang="scss" scoped>

    .setup-screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__illustration {
            width: 75px;
            height: 135px;
            border: 3px solid #FF4040;
            border-radius: 15px;
            position: relative;

            .phone-top {
                position: absolute;
                top: 10px;
                left: calc(50% - 6px);
                width: 12px;
                height: 1px;
                border-radius: 2px;
                border: 1px solid #FF4040;
            }

            .phone-bottom {
                position: absolute;
                bottom: 10px;
                border: 2px solid #FF4040;
                width: 12px;
                height: 12px;
                left: calc(50% - 3.5px);
                border-radius: 50%;
            }
        }

        &__text {
            font-size: 24px;
            letter-spacing: 5px;
            margin-top: 5rem;
            text-align: center;
        }
    }
</style>
