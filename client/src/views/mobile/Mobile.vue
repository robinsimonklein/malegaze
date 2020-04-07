<template>
    <div class="mobile">
        <p>ID : {{ this.mobileId }}</p>
        <button @click="start">Commencer</button>
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
        sockets: {
            started() {
                // L'expérience commence
                alert('L\'expérience commence')
            }
        },
        methods: {
            start(){
                this.$socket.emit('start')
            }
        },
        created() {
            this.$store.commit('mobile/setMobileId', this.mobileId)
            this.$socket.emit('join_mobile_room', this.mobileId)
        }
    }
</script>
