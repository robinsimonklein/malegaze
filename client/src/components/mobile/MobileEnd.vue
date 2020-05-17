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
    export default {
        name: "MobileEnd",
        components: {MobileEndBetchdel, MobileEndImpact, MobileEndExplication, MobileEndIntro, MobileEndConclusion},
    }
</script>

<style scoped>
    .mobile-end {
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>
