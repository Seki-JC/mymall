<template>
    <div class="goodsList">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'goodsList',
        components:{
        }
    }
</script>
<style>
    .goodsList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>