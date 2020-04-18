<template>
    <div class="popup__wrap">
        <div class="popup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup"
    }
</script>

<style lang="scss" scoped>
.popup {
    display: inline-flex;
    flex-direction: column;
    background-color: white;
    color: black;
    padding: 1rem;

    &__wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        z-index: 900;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(black, .5);
        padding: 1rem;
    }
}
</style>
