<template>
    <div class="mobile-index">
        <nav></nav>
        <div class="brief">
            <div class="img">
                <img src="@/assets/png/loading_eye.png"/>
                <span class="circle"></span>
            </div>
            <div class="baseline">
                <h1>MaleGaze</h1>
                <h4>Une perspective cinématographique</h4>
            </div>
            <div class="text">
                <p>
                    Pour assister à la séance, rendez-vous sur :<br/>
                    <strong>{{ siteUrl }}</strong>
                    à partir d’un ordinateur et renseignez votre place.
                </p>
            </div>
            <img src="@/assets/png/goDown.png"/>
        </div>
        <div class="separator">
            <span>Votre ticket de cinéma</span>
        </div>
        <div class="keyboard">
            <div>
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
                    <div class="delete" @click="deleteNumber()">
                        <img src="@/assets/png/delete.png"/></div>
                    <div class="action">
                        <button @click="play">Action</button>
                    </div>
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
                    place: null,
                    row: null,
                },
                inputOrder: {
                    room: 0,
                    price: 1,
                    place: 2,
                    row: 3
                },
                selectedInput: 'room'
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
                let index;
                for (const expr in this.inputs) {
                    if (expr === this.selectedInput) {
                        this.inputs[expr] = number;
                    }
                }
                for (const expr in this.inputOrder) {
                    if (expr === this.selectedInput) {
                        index = this.inputOrder[expr] + 1;
                    }
                    if (index === this.inputOrder[expr]) {
                        this.selectedInput = expr.toString();
                    }
                }

            },
            deleteNumber() {
                let index;
                let isDeleted = false;
                for (const expr in this.inputs) {
                    if (expr === this.selectedInput) {
                        if (this.inputs[expr] !== null) {
                            this.inputs[expr] = null;
                        } else {
                            isDeleted = true;
                        }
                    }
                }
                if (!isDeleted) {
                    return;
                }
                for (const expr in this.inputOrder) {
                    if (expr === this.selectedInput) {
                        index = this.inputOrder[expr] - 1;
                    }
                }
                for (const expr in this.inputOrder) {
                    if (index === this.inputOrder[expr]) {
                        this.selectedInput = expr.toString();
                        this.inputs[expr] = null;
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
            height: calc(100vh - 14px);
            font-size: 18px;
            text-align: center;
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
            background: url("/png/ecranaccueil_tel.png");
            background-position-x: center;
            background-size: cover;

            div:first-of-type {
                text-align: center;
                position: relative;

                img {
                    width: 127px;
                }

                .circle {
                    width: 20px;
                    height: 20px;
                    background: #FF4040;
                    border-radius: 50%;
                    position: absolute;
                    left: calc(50% - 5px);
                    top: 40px;
                    transform-origin: left center;
                    transform: rotate(90deg);
                    animation: eye 2s infinite alternate;
                }
            }

            .text {
                width: 90%;
                margin: 0 auto;
                text-align: center;

                strong {
                    display: block;
                    margin: 20px auto;
                    color: #FF4040;
                    font-weight: normal;
                }

                p {
                    margin: 0;
                }
            }

            .baseline {
                text-align: center;
                width: 90%;
                margin: 0 auto;
                padding-bottom: 30px;
                border-bottom: 2px solid #FF4040;

                h1 {
                    text-transform: uppercase;
                    font-size: 60px;
                }

                h4 {
                    text-transform: uppercase;
                    font-size: 14px;
                }
            }

            > img {
                width: 16px;
                align-self: center;
                animation: goDown 1s infinite;
            }
        }

        .separator {
            margin-bottom: 15px;
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
            border-top: 2px dashed white;
            width: 100%;
            padding-top: 35px;
            text-transform: uppercase;

            > div {
                width: 80%;
                margin: auto;
            }

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
                        width: calc(100% - 5vw);
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

        @keyframes eye {
            0% {
                transform: translateX(0) translateY(0);
            }

            40% {
                transform: translateX(-5px) translateY(5px);
            }

            60% {
                transform: translateX(-5px) translateY(5px);
            }

            100% {
                transform: translateX(-10px) translateY(0);
            }
        }

        @keyframes goDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(10px);
                opacity: 0.5;
            }
        }
    }
</style>
