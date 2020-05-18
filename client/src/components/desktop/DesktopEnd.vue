<template>
    <div v-if="currentView === 'end'" class="desktop-end">
        <div class="definition">
            <h1 class="definition__title">Male Gaze</h1>
            <p class="definition__text">Terme qui désigne le fait que la culture visuelle dominante impose au public d’adopter un regard d’homme hétérosexuel.</p>
        </div>
        <footer class="footer">
            <img class="footer__icon" src="@/assets/png/goDownphone.png" alt="goDown"/>
            <span class="footer__text">Le male gaze en 3 minutes</span>
        </footer>
    </div>
    <div v-else-if="currentView === 'credit'" class="desktop-end">
        <DesktopCredit />
    </div>
</template>

<script>
    import DesktopCredit from './DesktopCredit';
    import gsap from 'gsap';

    export default {
        name: "DesktopEnd",
        components: {DesktopCredit},
        data() {
            return {
                currentView: 'end',
            }
        },
        sockets: {
            mobile_scrolled() {
                const tl = new gsap.timeline();
                tl.to('.footer__icon', {duration: 1, y: -20, alpha: 0, ease: 'power1.in'})
                tl.to('.footer__text', {duration: 1, y: -20, alpha: 0, ease: 'power1.in'}, '<0.2')
                tl.to('.definition__title', {duration: 1, alpha: 0, y: -20, ease: 'power2.in'}, '<')
                tl.to('.definition__text', {duration: 1, alpha: 0, y: -20, ease: 'power2.in'}, '<0.1')
                tl.call(() => {
                    this.currentView = 'credit';
                }, [], '>2')
            }
        },
        mounted() {
            const tl = new gsap.timeline()
            tl.from('.definition__title', {duration: 3, delay: 1, alpha: 0, ease: 'power2.out'})
            tl.from('.definition__text', {duration: 3, alpha: 0, ease: 'power2.out'}, '<0.5')
            tl.from('.footer__text', {duration: 3, y: -20, alpha: 0, ease: 'power2.out'})
            tl.from('.footer__icon', {duration: 3, y: -20, alpha: 0, ease: 'power2.out'}, '<0.5')
        }
    }
</script>

<style lang="scss" scoped>
    .desktop-end {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        position: relative;

        .definition {
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
            width: 50vw;
            text-align: center;

            h1 {
                text-transform: uppercase;
                width: 100%;
                font-size: 50px;
                font-weight: normal;
                padding-bottom: 20px;
                border-bottom: 1px solid #FF4040;
            }

            p {
                margin-top: 20px;
                font-size: 24px;
                font-weight: normal;
                line-height: 35px;
            }
        }

        footer {
            position: absolute;
            bottom: 50px;
            display: flex;
            flex-direction: column;

            img {
                width: 50px;
                align-self: center;
            }

            span {
                margin-top: 25px;
                text-transform: uppercase;
                color: #FF4040;
            }
        }
    }
</style>
