<template>
    <div class="RecommendViewItem">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'RecommendViewItem'
    }
</script>

<style>
    .RecommendViewItem {
        flex: 1;
        padding-top: 2vw;
        padding-bottom: 5vw;
        text-align: center;
        font-size: 14px;
    }
    .RecommendViewItem img {
        width: 23vw;
        height: 23vw;
        border-radius: 50%;
        margin: 0 1vw;
    }
</style>