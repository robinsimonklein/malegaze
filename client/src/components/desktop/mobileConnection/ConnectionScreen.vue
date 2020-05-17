<template>
    <div class="connection-screen">
        <!--<p>Lancez <span class="connection-screen__url">{{url}}</span> sur votre smartphone et renseignez votre place.</p>
        <p>Salle : <span class="connection-screen__code">{{splitId[0]}}</span> | Prix : <span class="connection-screen__code">{{splitId[1]}}</span> | Rangée : <span class="connection-screen__code">{{splitId[2]}}</span> | Place : <span class="connection-screen__code">{{splitId[3]}}</span></p>
    -->
        <h2>Lancez <span>{{url}}</span><br/>
            sur votre téléphone et renseignez votre place</h2>
        <div class="cinema-ticket">
            <div class="title">
                <div>
                    <h3>Malegaze</h3>
                    <span>Un film malegaze</span>
                </div>
                <span>10 minutes</span>
            </div>
            <div class="numbers">
                <div>
                    <span class="price-title">Salle</span>
                    <span class="price">{{ splitId[0] }}</span>
                </div>
                <div>
                    <span class="price-title">Prix</span>
                    <span class="price">{{ splitId[1] }}</span>
                </div>
                <div>
                    <span class="price-title">Place</span>
                    <span class="price">{{ splitId[2] }}</span>
                </div>
                <div>
                    <span class="price-title">Rangée</span>
                    <span class="price">{{ splitId[3] }}</span>
                </div>
            </div>
            <div class="baseline">
                <span>Bonne séance !</span>
            </div>
        </div>
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
        }
    }
</script>

<style lang="scss" scoped>
    .connection-screen {
        background: #202020;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 60%;

        h1 {
            margin-bottom: 2rem;
        }

        h2 {
            letter-spacing: 5px;
            font-size: 24px;
            font-weight: normal;
            width: 100%;
            text-align: center;
            line-height: 50px;
            margin-bottom: 5rem;

            span {
                color: #FF4040;
                text-transform: uppercase;
            }
        }

        .cinema-ticket {
            width: 90%;
            border-top: 1px solid white;
            border-bottom: 1px solid white;

            .title {
                display: flex;
                justify-content: space-between;
                padding: 15px 2px;
                border-bottom: 1px solid white;

                h3 {
                    font-weight: bold;
                    font-size: 35px;
                }

                span {
                    font-size: 18px;
                    align-self: flex-end;
                }

                h3, span {
                    text-transform: uppercase;
                }
            }

            .numbers {
                padding: 15px 2px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid white;

                div {
                    border-right: 1px solid white;
                    display: flex;
                    flex-direction: column;
                    width: 25%;
                    padding: 10px 30px 0 0;

                    &:last-of-type {
                        border-right: none;
                    }

                    .price-title {
                        text-transform: uppercase;
                        text-align: center;
                        letter-spacing: 5px;
                        width: 100%;
                        font-size: 18px;
                        padding-left: 10px;
                    }

                    .price {
                        color: #FF4040;
                        font-weight: bold;
                        font-size: 50px;
                        align-self: flex-end;
                    }

                    &:first-of-type .price-title {
                        text-align: left;
                    }
                }
            }

            .baseline {
                text-transform: uppercase;
                text-align: center;
                padding: 15px 2px;

                span {
                    font-weight: bold;
                }
            }
        }
    }
</style>
