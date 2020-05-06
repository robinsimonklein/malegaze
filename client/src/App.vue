<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('app/checkMobile')

            if(this.$store.state.app.isMobile) document.body.classList.add('is-mobile')
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;

        &.is-mobile {
            height: 100vh;
            max-height: 100vh;
            overflow: hidden;
        }
    }
</style>
