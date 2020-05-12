<template>
    <div class="connection-screen">
        <p>Lancez <span class="connection-screen__url">{{url}}</span> sur votre smartphone et renseignez votre place.</p>
        <p>Salle : <span class="connection-screen__code">{{splitId[0]}}</span> | Prix : <span class="connection-screen__code">{{splitId[1]}}</span> | Rangée : <span class="connection-screen__code">{{splitId[2]}}</span> | Place : <span class="connection-screen__code">{{splitId[3]}}</span></p>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "ConnectionScreen",
        data() {
            return {
                url: null
            }
        },
        computed: {
            ...mapState('mobile', ['mobileId']),
            splitId() {
                const array = this.mobileId.split('')
                array.shift()
                return array
            },

        },
        beforeMount() {
            this.url = window.location.host
        },
        mounted() {
            console.log(window.location.host)
        }
    }
</script>

<style lang="scss" scoped>
.connection-screen {
    font-size: 1.375rem;
        text-align: center;

    &__url {
        font-size: 1.8rem;
        color: $color-primary;
        text-transform: uppercase;
    }

    &__code {
        color: $color-primary;
        text-transform: uppercase;
    }
}
</style>
