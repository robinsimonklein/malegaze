<template>
    <div class="mobile-index">
        <h1>Male Gaze</h1>

        <p>Ouvrez <strong>{{ siteUrl }}</strong> sur votre ordinateur et entrez le code qui s'affiche à l'écran.</p>

        <div class="ticket">
            <h2 class="ticket__header">Ticket pour votre séance</h2>
            <div class="ticket__row">
                <label class="ticket__label"> Salle
                    <select class="ticket__select" v-model="inputs.room">
                        <option v-for="i in 9" :key="i" :value="i">{{ i }}</option>
                    </select>
                </label>
                <label class="ticket__label"> Prix
                    <select class="ticket__select" v-model="inputs.price">
                        <option v-for="i in 9" :key="i" :value="i">{{ i }}</option>
                    </select>
                </label>
            </div>
            <div class="ticket__row">
                <label class="ticket__label"> Rangée
                    <select class="ticket__select" v-model="inputs.row">
                        <option v-for="i in 9" :key="i" :value="i">{{ i }}</option>
                    </select>
                </label>
                <label class="ticket__label"> Place
                    <select class="ticket__select" v-model="inputs.place">
                        <option v-for="i in 9" :key="i" :value="i">{{ i }}</option>
                    </select>
                </label>
            </div>
            <button class="ticket__button" @click="play">Play</button>
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

<style lang="scss" scoped>
    .mobile-index {

    }

    .ticket {
        display: flex;
        flex-direction: column;

        &__header {
            padding: 0.25rem;
            background: white;
            font-size: .75rem;
            color: black;
            font-weight: normal;
            text-align: center;
            text-transform: uppercase;
            @include letter-spacing(50)
        }

        &__row {
            display: flex;
            width: 100%;
        }

        &__label {
            width: 50%;
            text-transform: uppercase;
        }

        &__select {
            font-size: 2.3rem;
            color: $color-primary;
            text-align: center;
            background: none;
            border: none;
            outline: none;
        }

        &__button {
            display: inline-block;
            color: $color-primary;
            font-size: 1.375rem;
            border: 1px solid $color-primary;
        }
    }
</style>
