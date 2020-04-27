<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('app/checkMobile')
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;
    }
</style>
