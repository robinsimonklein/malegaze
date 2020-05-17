<template>
    <div class="desktop-end">
        <div class="definition">
            <h1>Male Gaze</h1>
            <p>Terme qui désigne le fait que la culture visuelle dominante impose au public d’adopter un regard d’homme hétérosexuel.</p>
        </div>
        <footer>
            <img src="@/assets/png/goDownphone.png" alt="goDown"/>
            <span>Le male gaze en 3 minutes</span>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "DesktopEnd",
    }
</script>

<style lang="scss" scoped>
    .desktop-end {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;

        .definition {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            width: 50vw;
            text-align: center;

            h1 {
                text-transform: uppercase;
                width: 100%;
                font-size: 50px;
                font-weight: normal;
                padding-bottom: 20px;
                border-bottom: 1px solid #FF4040;
            }

            p {
                margin-top: 20px;
                font-size: 24px;
                font-weight: normal;
                line-height: 35px;
            }
        }

        footer {
            position: absolute;
            bottom: 50px;
            display: flex;
            flex-direction: column;

            img {
                width: 50px;
                align-self: center;
            }

            span {
                margin-top: 25px;
                text-transform: uppercase;
                color: #FF4040;
            }
        }
    }
</style>
