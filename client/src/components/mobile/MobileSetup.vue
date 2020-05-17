<template>
    <div class="mobile-setup">
        <template v-if="mode === 'connection'">
            <nav></nav>
            <p>Votre smartphone vous servira tout au long de l'expérience.</p>
            <div class="instructions">
                <p>
                    <span>01</span>Tenez le à la verticale
                </p>
                <p>
                    <span>02</span>Ne quittez pas la page
                </p>
                <p>
                    <span>03</span>Ne verrouillez pas votre téléphone
                </p>
            </div>
            <button @click="startCalibration">Suivant</button>
            <footer></footer>
        </template>
        <template v-else-if="mode === 'calibration'">
            <CalibrationCamera v-on:finish="finishCalibration"/>
        </template>
    </div>
</template>

<script>
    import CalibrationCamera from "./setup/CalibrationCamera";

    export default {
        name: "MobileSetup",
        components: {CalibrationCamera},
        data() {
            return {
                mode: 'connection'
            };
        },
        mounted() {
            this.$socket.emit('mobile_orientation');
        },
        sockets: {
            mobile_calibrate() {
                this.mode = 'calibration';
            },
            mobile_ready() {
                this.mode = 'ready';
            }
        },
        methods: {
            startCalibration() {
                this.$socket.emit('mobile_calibrate');
            },
            finishCalibration() {
                this.$socket.emit('mobile_ready');
            },
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-setup {
        width: 100%;
        margin: auto;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        letter-spacing: 3px;

        nav, footer {
            background: #FF4040;
            width: 100%;
            height: 14px;
        }

        footer {
            align-self: flex-end;
        }

        p {
            font-size: 18px;
            margin: 0 auto;
            display: flex;
        }

        > p {
            padding: 0 30px;
        }

        .instructions {
            width: 80%;
            margin: 0 auto;

            p {
                margin: 20px 0;
            }

            span {
                color: #FF4040;
                margin-right: 30px;
            }
        }

        button {
            background: transparent;
            margin: 0 auto;
            color: #FF4040;
            min-width: 100px;
            padding: 15px 25px;
            border: 1px solid #FF4040;
            text-transform: uppercase;
            font-size: 18px;
            letter-spacing: 5px;
        }
    }
</style>
