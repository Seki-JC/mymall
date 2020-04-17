<template>
    <div class="goodsListItem">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'goodsListItem',
        components:{
        }
    }
</script>
<style>
    .goodsListItem {
        text-align: center;
    }
    .goodsListItem img{
        border-radius: 3vw;
        width: 47vw;
    }
</style>