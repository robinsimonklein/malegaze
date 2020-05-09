<template>
    <div class="mobile-end">
        <MobileEndIntro/>
        <MobileEndExplication/>
        <MobileEndImpact/>
    </div>
</template>

<script>
    import MobileEndIntro from "./end/MobileEndIntro";
    import MobileEndExplication from "./end/MobileEndExplication";
    import MobileEndImpact from "./end/MobileEndImpact";
    export default {
        name: "MobileEnd",
        components: {MobileEndImpact, MobileEndExplication, MobileEndIntro},
    }
</script>

<style scoped>
    .mobile-end {
        overflow: auto;
    }
</style>
