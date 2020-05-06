<template>
    <div class="mobile-cameraman-scenery">
        <div class="mobile-cameraman-scenery__interactions">
            <component :is="interactionComponent" @done="emitInteractionDone"></component>
        </div>
        <!-- Track the mobile orientation -->
        <MobileOrientation :debug="false"/>
    </div>
</template>

<script>
    import appStates from '../../js/appStates';
    import MobileOrientation from './orientation/MobileOrientation';
    import EventManager from "../../js/event/EventManager";
    import MobileInteractionFraming from "./interactions/MobileInteractionFraming";
    import MobileInteractionTraveling from "./interactions/MobileInteractionTraveling";
    import MobileInteractionZoom from "./interactions/MobileInteractionZoom";
    import MobileInteractionRotation from "./interactions/MobileInteractionRotation";

    export default {
        name: "MobileCameramanScenery",
        components: {MobileOrientation, MobileInteractionFraming, MobileInteractionTraveling, MobileInteractionZoom, MobileInteractionRotation},
        data() {
            return {
                interaction : null
            }
        },
        sockets: {
            camera_zoom(value) {
                EventManager.publish('camera:zoom', value)
            },
            camera_rec() {
                EventManager.publish('camera:rec')
            },
            mobile_interaction_set(interaction) {
                this.interaction = interaction
            }
        },
        computed: {
            interactionComponent() {
                switch (this.interaction) {
                    case 'framing':
                        return 'MobileInteractionFraming'
                    case 'traveling':
                        return 'MobileInteractionTraveling'
                    case 'zoom':
                        return 'MobileInteractionZoom'
                    case 'rotation':
                        return 'MobileInteractionRotation'
                    default:
                        return null
                }
            }
        },
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.ACTRESS);
            },
            emitInteractionDone() {
                this.$socket.emit('mobile_interaction_done')
            },
            startRec() {
                this.$socket.emit('camera_rec');
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mobile-cameraman-scenery {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #202020;
        overflow: hidden;

        &__infos {
            position: absolute;
            top: .5rem;
            right: .5rem;
            display: flex;
            flex-direction: column;
            height: 10vh;
        }

        &__controls {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            &__zoom {
                display: flex;
                justify-content: center;
                height: 50vh;
                margin-left: -10vh;

                span {
                    margin-top: calc(50% + 10vh + 15px);
                    margin-right: 20px;
                }

                &__instructions {
                    div {
                        margin-top: calc(20vh + 15px);
                        position: relative;
                        width: 1px;
                        height: calc(100% - 30px);
                        background: rgba(white, .5);
                        margin-right: 80px;

                        &:before {
                            content: "+";
                            color: white;
                            position: absolute;
                            top: -20px;
                            left: -2.8px;
                            font-weight: bold;
                        }

                        &:after {
                            content: "-";
                            color: white;
                            position: absolute;
                            bottom: -20px;
                            left: -2.5px;
                            font-weight: bold;
                        }
                    }
                }

                &__slider {

                }
            }

            &__rec {
                margin-top: 15vh;
                &__button {
                    margin: 50px auto auto;
                    border-radius: 65px;
                    width: 110px;
                    height: 110px;
                    border: 3px solid #C60000;
                    cursor: pointer;

                    button {
                        display: block;
                        margin: 7px auto auto;
                        background-color: #C60000;
                        border-radius: 45px;
                        width: 90px;
                        height: 90px;
                    }
                }

                span {
                    display: block;
                    margin: 25px auto auto;
                    color: #C60000;
                    text-align: center;
                }
            }
        }

    }
    .mobile-interaction {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
    }
</style>
