<template>
    <div class="mobile-index">
        <h1>Male Gaze</h1>

        <p>Ouvrez <strong>{{ siteUrl }}</strong> sur votre ordinateur et entrez le code qui s'affiche à l'écran.</p>

        <div class="ticket">
            <div class="ticket__row">
                <label> Salle <input v-model="inputs.room" type="number" pattern="[0-9]*" class="ticket__field" min="1" max="9" step="1" maxlength="1" name="room"/></label>
                <label> Prix <input v-model="inputs.price" type="number" pattern="[0-9]*" class="ticket__field" min="1" max="9" step="1" maxlength="1" name="price" /></label>
            </div>
            <div class="ticket__row">
                <label> Rangée <input v-model="inputs.row" type="number" pattern="[0-9]*" class="ticket__field" min="1" max="9" step="1" maxlength="1" name="row" /></label>
                <label> Place <input v-model="inputs.place" type="number" pattern="[0-9]*" class="ticket__field" min="1" max="9" step="1" maxlength="1" name="seat" /></label>
            </div>
            <button @click="play">Play</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MobileIndex",
        data() {
            return {
                siteUrl: null,
                inputs: {
                    room: 1,
                    price: 1,
                    row: 1,
                    place: 1
                }
            }
        },
        computed: {
            roomId() {
                return `_${this.inputs.room}${this.inputs.price}${this.inputs.row}${this.inputs.place}`
            }
        },
        methods: {
            play() {
                this.$socket.emit('ask_mobile_room', this.roomId, (answer) => {
                    if(!answer) {
                        alert('Impossible de se connecter. Rééssayez.')
                    }else{
                        this.$router.push({ name: 'Mobile', params: { mobileId: this.roomId } })
                    }
                })
            }
        },
        beforeMount() {
            this.siteUrl = window.location.host
        }
    }
</script>
