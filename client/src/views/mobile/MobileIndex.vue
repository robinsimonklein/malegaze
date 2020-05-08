<template>
    <div class="mobile-index">
        <h1>Male Gaze</h1>

        <p>Ouvrez <strong>{{ siteUrl }}</strong> sur votre ordinateur et entrez le code qui s'affiche à l'écran.</p>
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
            console.log(window.location)
            this.siteUrl = window.location.host
        }
    }
</script>
