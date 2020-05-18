<template>
    <div class="mobile-end">
        <MobileEndIntro/>
        <MobileEndExplication/>
        <MobileEndImpact/>
        <MobileEndBetchdel/>
        <MobileEndConclusion/>
    </div>
</template>

<script>
    import MobileEndIntro from "./end/MobileEndIntro";
    import MobileEndExplication from "./end/MobileEndExplication";
    import MobileEndImpact from "./end/MobileEndImpact";
    import MobileEndBetchdel from "./end/MobileEndBetchdel";
    import MobileEndConclusion from "./end/MobileEndConclusion";
    import gsap from 'gsap'

    export default {
        name: "MobileEnd",
        components: {MobileEndBetchdel, MobileEndImpact, MobileEndExplication, MobileEndIntro, MobileEndConclusion},
        data() {
            return {
                isEmitted: false
            };
        },
        mounted() {
            document.addEventListener("touchmove", () => {
                if (this.isEmitted) {
                    return;
                }
                this.$socket.emit('mobile_scrolled');
                this.isEmitted = true;
            }, false);

            gsap.fromTo('.mobile-end', {alpha: 0}, {alpha: 1, duration: 5, delay: 3.5, ease: 'power3.out'})
        }
    }
</script>

<style scoped>
    .mobile-end {
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
