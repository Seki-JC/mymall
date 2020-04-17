<template>
    <div class="swiperItem">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'SwiperItem'
    }
</script>

<style>
    .swiperItem {
        width: 100vw;
        flex-shrink: 0;
    }
    .swiperItem img {
        width: 100%;
    }
</style>