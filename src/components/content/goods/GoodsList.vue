<template>
    <div class="goodsList">
        <goods-list-item v-for="(item, index) in resultGoodsList" :key="index" 
                         @click.native='goodsClick(item)'>
            <img :src="item.imgUrl">
            <div>{{item.title}}</div>
        </goods-list-item>
    </div>
</template>
<script>
    import GoodsListItem from "components/content/goods/GoodsListItem"
    export default {
        name: 'goodsList',
        components:{
            GoodsListItem
        },
        props: {
            resultGoodsList: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            goodsClick(item) {
                this.$router.push('/detail/'+item.goodsId),
                this.$store.commit("updateCurrentDetail", item);
            }
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