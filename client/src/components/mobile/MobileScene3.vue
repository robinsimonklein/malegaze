<template>
    <div class="mobile-spectator-scenery">
        <img class="mobile-spectator-scenery__button" :class="{'visible' : !disabled}" @click="listen" src="@/assets/svg/mobile_listen.svg">
        <button class="mobile-spectator-scenery__finish" v-show="nextAllowed" @click="next">Terminer</button>
    </div>
</template>

<script>
    import EventManager from "../../js/event/EventManager";

    export default {
        name: "MobileScene3",
        data() {
            return {
                events: [null],
                disabled: true,
                nextAllowed: false,
                nextClicked: false
            }
        },
        sockets: {
            mobile_allow_next() {
                this.nextAllowed = true
            }
        },
        methods: {
            listen() {
                if (!this.disabled) this.$socket.emit('mobile_interaction', 'listen')

            },
            next() {
                if(this.nextAllowed && !this.nextClicked) {
                    this.$socket.emit('mobile_interaction_done')
                    this.nextClicked = true
                }
            }
        },
        mounted() {
            this.events.push(EventManager.subscribe('mobile:interaction_set', (interaction) => {
                interaction === 'listen' ? this.disabled = false : this.disabled = true
            }))
        },
        beforeDestroy() {
            this.events.forEach((event) => {
                event.unsubscribe()
            })
        }

    }
</script>

<style lang="scss" scoped>
.mobile-spectator-scenery {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    touch-action: manipulation;

    &__button {
        opacity: 0;
        transition: opacity .5s ease;
        &.visible {
            opacity: 1;
            transition: opacity .5s ease;
        }
    }

    &__finish {
        margin-top: 1rem;
        color: $color-primary;
        border: 1px solid $color-primary;
        padding: .5rem;
        text-transform: uppercase;
    }
}
</style>
