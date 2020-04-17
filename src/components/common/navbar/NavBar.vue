<template>
    <div class="navbar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name:'navbar'
    }
</script>

<style>
    .navbar {
        width: 100%;
        display: flex;
        line-height: 44px;
        box-shadow: 0px 2px 1px rgba(150, 150, 150, 0.1);
    }
    .left, .right {
        width: 60px;
    }
    .center {
        flex: 1;
        text-align: center;
    }
</style>