<template>
    <div class="qr-code">
        <canvas id="qrcode-canvas"></canvas>
    </div>
</template>

<script>
    import QRCode from 'qrcode'

    export default {
        name: "QRCode",
        props: {
            url: {
                type: String,
                required: true
            }
        },
        mounted() {
            let canvas = document.getElementById('qrcode-canvas')

            QRCode.toCanvas(canvas, this.url, {
                width: 250,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                }
            }, (error) => {
                if (error) console.error(error)
                console.log('QR Code created !');
            })
        }
    }
</script>

<style scoped>

</style>
