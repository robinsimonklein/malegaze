<template>
    <div class="mobile-index">
        <h1>Mobile Index</h1>

        <p>Ouvrez <a :href="siteUrl">{{ siteUrl }}</a> sur votre ordinateur et scannez le QR Code qui s'affiche avec votre mobile.</p>
    </div>
</template>

<script>
    export default {
        name: "MobileIndex",
        data() {
            return {
                siteUrl: null
            }
        },
        beforeMount() {
            this.siteUrl = window.location.origin
        }
    }
</script>
