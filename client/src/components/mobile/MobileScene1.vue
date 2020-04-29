<template>
    <div class="mobile-scene-1">
        <div class="mobile-scene-1__infos">
            <span>Mobile Scène 1</span>
            <button @click="next" class="btn">Next</button>
        </div>
        <div class="mobile-scene-1__controls">
            <div class="mobile-scene-1__controls__zoom">
                <span>ZOOM</span>
                <div class="mobile-scene-1__controls__zoom__instructions">
                    <div></div>
                </div>
                <ZoomSlider class="mobile-scene-1__controls__zoom__slider"/>
            </div>
            <div class="mobile-scene-1__controls__rec">
                <div class="mobile-scene-1__controls__rec__button">
                    <button @click="startRec()"></button>
                </div>
                <span>REC</span>
            </div>
        </div>
        <!-- Track the mobile orientation -->
        <MobileOrientation :debug="false"/>
    </div>
</template>

<script>
    import appStates from '../../js/appStates';
    import MobileOrientation from './orientation/MobileOrientation';
    import ZoomSlider from './controls/ZoomSlider';

    export default {
        name: "MobileScene1",
        components: {ZoomSlider, MobileOrientation},
        methods: {
            next() {
                this.$socket.emit('state_request', appStates.ACTRESS);
            },
            startRec() {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-scene-1 {
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: #202020;
        overflow-x: hidden;

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
</style>
