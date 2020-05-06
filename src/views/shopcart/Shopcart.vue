<template>
    <div class="shopcart">
      <navbar>
        <div slot="center">购物车({{goodsList.length}})</div>
      </navbar>
      <scroll class="scroll">
        <div v-for="(item,index) in goodsList" :key="index" class="goodsList">
          <div class="goodsItem">
            <span class="goodsTitle">{{item.title}}</span>
            <span class="goodsDes">{{item.goodDes}}</span>
            <span class="goodsPrice">单价￥{{item.price}}</span>
            
            <span class="goodsCount">
              <span class="goodsCountChange" @click="subGoodsCount(index)">-</span>
              <input type="text" v-model="item.count" class="goodsCountNumber">
              <span class="goodsCountChange" @click="addGoodsCount(index,item.count)">+</span>
            </span>

            <span class="goodsTotalPrice">总￥{{item.price * item.count}}</span>
          </div>
          <div class="goodsDelete" @click="goodsDelete(index)">×</div>
        </div>
      </scroll>
      <shopcart-count :goodsList="goodsList"></shopcart-count>
    </div>
</template>

<script>
import Navbar from "components/common/navbar/NavBar"
import Scroll from "components/common/scroll/Scroll"
import ShopcartCount from "./shopcartCount/ShopcartCount"

export default {
  name: 'Shopcart',
  components:{
    Navbar,
    Scroll,
    ShopcartCount
  },
  activated() {
    // 激活时更新购物车的内容
    this.goodsList = this.$store.state.goodsList;
  },
  data() {
    return {
      goodsList:[],
      countList:[]
    }
  },
  methods: {
    addGoodsCount(index) {
      this.$store.commit({
        type: "GoodsListChangeCount",
        index:index,
        val: 1
      })
    },
    subGoodsCount(index,currentIndex) {
      this.$store.commit({
        type: "GoodsListChangeCount",
        index:index,
        val: -1
      })
    },
    goodsDelete(index) {
      this.goodsList.splice(index,1);
      // 删除购物车内的商品，并同步到vuex中
      this.$store.commit("updateGoodsList", this.goodsList);
    }
  }
}
</script>

<style scoped>
  .navbar {
    background-color: skyblue;
    color: #fff;
  }
  .scroll {
    height: calc(100vh - 44px - 49px - 60px);
    overflow: hidden;
  }
  .goodsList {
    display: flex;
    height: 80px;
    line-height: 80px;
    margin-bottom: 10px;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    box-shadow: 1px 1px 2px rgba(119, 116, 116, 0.4);
  }
  .goodsCountNumber {
    width: 30px;
    text-align: center;
  }
  .goodsItem {
    flex: 9;
    position: relative;
  }
  .goodsItem .goodsTitle {
    position: absolute;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    top: 0;
    left: 0;
  }
  .goodsItem .goodsPrice {
    position: absolute;
    height: 30px;
    line-height: 30px;
    bottom: 0;
    left: 40px;
  }
  .goodsItem .goodsCount {
    position: absolute;
    height: 30px;
    line-height: 30px;
    bottom: 0;
    left: 40vw;
  }
  .goodsItem .goodsTotalPrice {
    position: absolute;
    height: 30px;
    line-height: 30px;
    bottom: 0;
    right: 5vw;
    color: orange;
  }
  .goodsCountChange {
    display: inline-block;
    width: 20px;
    background-color: #bfa;
    text-align: center;
  }
  .goodsDelete {
    flex: 1;
    text-align: center;
    border-left: 1px solid #aaa;
    background-color: rgba(255, 21, 21,0.8)
  }
</style>