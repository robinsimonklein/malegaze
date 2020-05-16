<template>
    <div class="mobile-index">
        <nav></nav>
        <div class="brief">
            <div>
                <img src="@/assets/png/eye.png"/>
            </div>
            <div class="text">
                <p>
                    Mâle Gaze est une expérience cinématographique vous plongeant dans les coulisses du cinéma. </p>
                <p>Pour assister à la séance, rendez-vous sur <strong>{{ siteUrl }}</strong> à partir d’un
                    ordinateur. </p>
            </div>
        </div>
        <div class="separator">
            <span>Votre ticket de cinéma</span>
        </div>
        <div class="keyboard">
            <h2>Male gaze</h2>
            <span>Une expérience de 15 minutes</span>
            <div class="keyboard__display">
                <div @click="setInput('room')"
                     :class="{'active' : selectedInput === 'room' && !inputs.room}">
                    <span>Salle</span>
                    <span class="input">{{ inputs.room }}</span>
                </div>
                <div @click="setInput('price')"
                     :class="{'active' : selectedInput === 'price' && !inputs.price}">
                    <span>Prix</span>
                    <span class="input">{{ inputs.price }}<span class="euro">€</span>
                    </span>
                </div>
                <hr/>
                <div @click="setInput('place')"
                     :class="{'active' : selectedInput === 'place' && !inputs.place}" class="bottom">
                    <span>Place</span>
                    <span class="input">{{ inputs.place }}</span>
                </div>
                <div @click="setInput('row')"
                     :class="{'active' : selectedInput === 'row' && !inputs.row}" class="bottom">
                    <span>Rangée</span>
                    <span class="input">{{ inputs.row }}</span>
                </div>
            </div>
            <div class="keyboard__content">
                <div class="number" @click="setNumber(1)">1</div>
                <div class="number" @click="setNumber(2)">2</div>
                <div class="number" @click="setNumber(3)">3</div>
                <div class="number" @click="setNumber(4)">4</div>
                <div class="number" @click="setNumber(5)">5</div>
                <div class="number" @click="setNumber(6)">6</div>
                <div class="number" @click="setNumber(7)">7</div>
                <div class="number" @click="setNumber(8)">8</div>
                <div class="number" @click="setNumber(9)">9</div>
                <div class="delete">
                    <img src="@/assets/png/delete.png"/></div>
                <div class="action">
                    <button @click="play">Action</button>
                </div>
            </div>
        </div>
        <footer></footer>
        <!-- <h1>Male Gaze</h1>

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
         </div> -->
    </div>
</template>

<script>
    export default {
        name: "MobileIndex",
        data() {
            return {
                siteUrl: null,
                inputs: {
                    room: null,
                    price: null,
                    row: null,
                    place: null
                },
                selectedInput: 'room',
            };
        },
        computed: {
            roomId() {
                return `_${this.inputs.room}${this.inputs.price}${this.inputs.place}${this.inputs.row}`;
            }
        },
        methods: {
            play() {
                this.$socket.emit('ask_mobile_room', this.roomId, (answer) => {
                    if (!answer) {
                        alert('Impossible de se connecter. Rééssayez.');
                    } else {
                        this.$router.push({name: 'Mobile', params: {mobileId: this.roomId}});
                    }
                });
            },
            setInput(value) {
                this.selectedInput = value;
            },
            setNumber(number) {
                for (const expr in this.inputs) {
                    if (expr === this.selectedInput) {
                        this.inputs[expr] = number;
                    }
                }
            }
        },
        beforeMount() {
            this.siteUrl = window.location.host;
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-index {
        background: #202020;
        nav, footer {
            background: #FF4040;
            width: 100%;
            height: 14px;
        }

        .brief {
            height: calc(100vh - 25px);
            border-bottom: 2px dashed white;
            font-size: 18px;

            div:first-of-type {
                text-align: center;
                margin: 40px 0;
            }

            .text {
                width: 90%;
                margin: 30px auto auto auto;

                strong {
                    color: #FF4040;
                    font-weight: normal;
                }
            }
        }

        .separator {
            margin-top: 5px;
            background: #FF4040;
            width: 100%;
            padding: 20px;
            text-align: center;

            span {
                text-transform: uppercase;
                font-size: 18px;
            }
        }

        .keyboard {
            width: 80%;
            margin: 35px auto auto;
            text-transform: uppercase;

            h2 {
                font-size: 35px;
                font-weight: normal;
            }

            span {
                font-size: 13px;
            }

            &__display {
                border-top: 2px solid white;
                display: flex;
                flex-wrap: wrap;
                margin-top: 30px;

                hr {
                    width: 100%;
                    border-top: 1px solid white;
                    margin: 20px auto;
                    background: none;
                }

                div {
                    width: 50%;
                    padding: 10px 40px 0 10px;
                    margin-top: 15px;
                    display: flex;
                    flex-direction: column;

                    span {
                        font-size: 16px;
                        text-transform: uppercase;

                        &.input {
                            color: #FF4040;
                            align-self: flex-end;
                            font-size: 32px;
                        }

                        .euro {
                            color: white;
                            font-size: 32px;
                        }
                    }

                    &:nth-of-type(2n) {
                        border-left: 1px solid white;
                    }

                    &.bottom {
                        margin-top: 0;
                    }

                    &.active {
                        .input:before {
                            visibility: visible;
                        }
                    }

                    .input:before {
                        content: '_';
                        animation-duration: 0.5s;
                        animation-iteration-count: infinite;
                        animation-name: animate_tick;
                        visibility: hidden;
                    }
                }
            }

            &__content {
                width: 90%;
                display: flex;
                flex-wrap: wrap;
                margin: 20px auto 40px auto;
                text-align: center;
                align-items: center;

                .number {
                    width: 33%;
                    padding: 15px 30px;
                    font-size: 30px;
                }

                .delete {
                    width: 33%;
                }

                .action {
                    width: 67%;
                    text-align: left;

                    button {
                        border: 1px solid #FF4040;
                        text-transform: uppercase;
                        color: #FF4040;
                        background: transparent;
                        border-radius: 0;
                        font-size: 18px;
                        padding-left: 40px;
                        position: relative;
                        width: calc(100% - 30px);
                        height: 45px;

                        &:before {
                            content: "";
                            position: absolute;
                            width: 13px;
                            height: 11px;
                            background-size: contain;
                            background-repeat: no-repeat;
                            background-image: url("/png/arrow.png");
                            left: 20px;
                            top: calc(50% - 5.5px);
                        }
                    }
                }
            }
        }

        @keyframes animate_tick {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 1;
            }

            51% {
                opacity: 0;
            }
        }
    }
</style>
