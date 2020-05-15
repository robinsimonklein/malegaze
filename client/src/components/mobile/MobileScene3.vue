<template>
    <div class="mobile-spectator-scenery">
        <img class="mobile-spectator-scenery__button" :class="{'visible' : !disabled}" @click="listen" src="@/assets/svg/mobile_listen.svg">
        <!-- <button @click="next" class="btn">Next</button> -->
    </div>
</template>

<script>
    import appStates from "../../js/appStates";
    import EventManager from "../../js/event/EventManager";

    export default {
        name: "MobileScene3",
        data() {
            return {
                event: null,
                disabled: true
            }
        },
        methods: {
            listen() {
                if (!this.disabled) this.$socket.emit('mobile_interaction', 'listen')

            },
            next() {
                this.$socket.emit('state_request', appStates.END)
            }
        },
        mounted() {
            this.event = EventManager.subscribe('mobile:interaction_set', (interaction) => {
                interaction === 'listen' ? this.disabled = false : this.disabled = true
            })
        },
        beforeDestroy() {
            this.event.unsubscribe()
        }

    }
</script>

<style lang="scss" scoped>
.mobile-spectator-scenery {
    touch-action: manipulation;

    &__button {
        opacity: 0;
        transition: opacity .5s ease;
        &.visible {
            opacity: 1;
            transition: opacity .5s ease;
        }
    }
}
</style>
