<template>
    <div class="DetailBottomBar">
        <div class="leftBtn">
            <div><span>客服</span></div>
            <div><span>店铺</span></div>
            <div><span>收藏</span></div>
        </div>
        <div class="rightBtn">
            <div @click="addShopCart" class="addShopCart"><span>加入购物车</span></div>
            <div><span>购买</span></div>
        </div>
        <div class="popup" v-show="isAdd">以成功添加到购物车</div>
    </div>
</template>
<script>
    export default {
        name: 'DetailBottomBar',
        data() {
            return {
                count: 0,
                goodsLength: 0,
                goodsInfo: {},
                id:'',
                haveThisGood: false,
                isAdd: false
            }
        },
        methods: {
            addShopCart() {
                this.count = this.$store.state.currentDetil.count;//获取当前商品的已加购物车的个数
                this.id = this.$store.state.currentDetil.goodsId
                this.goodsInfo = this.$store.state.currentDetil;//获取当前商品的信息

                this.goodsLength = this.$store.state.goodsList.length;//获取当前购物车数组的长度

                this.haveThisGood = false
                for (let i=0;i<this.goodsLength;i++) {
                   if (this.id == this.$store.state.goodsList[i].goodsId) {
                       // 检测到已有商品，count加1，退出循环
                       this.$store.commit(
                            {
                                type:"GoodsListChangeCount",
                                index:i,
                                val:1
                            })
                       this.haveThisGood = true;
                       break;
                   }
                }
                // 循环下来也没有发现该商品，则push
                if (this.haveThisGood == false) {
                    this.$store.commit("pushGoodsList", this.goodsInfo);
                    // 最后一位count清空 再加 1
                    this.$store.commit("GoodsListEmptyCount")
                    this.$store.commit(
                            {
                                type:"GoodsListChangeCount",
                                index:this.$store.state.goodsList.length - 1,
                                val:1
                            })
                }

                // popup提示框显示并一段时间后消失
                this.isAdd = true;
                setTimeout(() => {
                    this.isAdd = false
                }, 700);
            }
        }
    }
</script>
<style scoped>
    .DetailBottomBar {
        width: 100%;
        height: 49px;
        line-height: 49px;
        /* background-color: #bfa; */
        position: fixed;
        bottom: 0;
        left: 0;
        border-top: 1px solid #aaa;
        display: flex;
        background-color: #fff;
    }
    .leftBtn {
        display: flex;
        width: 50vw;
        text-align: center;
    }
    .leftBtn > * {
        flex: 1;
        border-right: 1px solid #aaa;
    }
    .rightBtn {
        display: flex;
        width: 50vw;
        text-align: center;
    }
    .rightBtn > :first-child {
        border-right: 1px solid #aaa;
        flex: 3;
    }
    .rightBtn > :nth-child(2) {
        flex: 2;
    }
    .addShopCart {
        background-color: #baf;
    }
    .addShopCart :focus {
        background-color: red;
    }
    .popup {
        position: absolute;
        width: 50vw;
        height: 10vw;
        line-height: 10vw;
        left: 25vw;
        top: -50vh;
        text-align: center;
        background-color: #ccc;
        color: #555555;
        border-radius: 3vw;
        }
</style>