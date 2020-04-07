<template>
    <div class="mobile">
        <h1>Mobile</h1>
        <p>ID : {{ this.mobileId }}</p>
    </div>
</template>

<script>
    export default {
        name: "Mobile",
        computed: {
            mobileId() {
                return this.$route.params.mobileId
            }
        },
        created() {
            this.$store.commit('mobile/setMobileId', this.mobileId)
            this.$socket.emit('join_mobile_room', this.mobileId)
        }
    }
</script>
