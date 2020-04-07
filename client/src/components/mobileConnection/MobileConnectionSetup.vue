<template>
    <div class="mobile-connection-setup">
        <QRCode v-if="mobileUrl" :url="mobileUrl" />
        <a v-if="mobileUrl" :href="mobileUrl" target="_blank">{{ mobileUrl }}</a>
    </div>
</template>

<script>
    import QRCode from "./QRCode";

    export default {
        name: "MobileConnectionSetup",
        components: {QRCode},
        computed: {
            mobileUrl() {
                return this.$store.getters['mobile/mobileUrl']
            }
        },
        beforeCreate() {
            this.$store.commit('mobile/generateMobileId')
        },
        beforeMount() {
            this.$socket.emit('join_mobile_room', this.$store.state.mobile.mobileId)
        }
    }
</script>
