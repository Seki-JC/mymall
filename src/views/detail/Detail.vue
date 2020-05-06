<template>
    <div class="detail">
      <navbar class="navbar">
        <div slot="left" class="back" @click="back">
          <span>←</span>
        </div>
        <div slot="center" class="navTitle">
          <div v-for="(item, index) in navTitle" :key="index" 
               class="navTitleItem" :class="{selected:currentIndex==index}"
               @click="titleClick(index)">{{item}}</div>
        </div>
      </navbar>
      <scroll class="scroll">
        <div class="showTop">
          <span>详情页</span>
          <p>商品id: {{id}}</p>
        </div>
        <div class="showPrice">
          <div class="title">{{goodsInfo.title}}</div>
          <div class="price">￥{{ goodsInfo.price }}</div>
          <div class="saleData">
            <span>收藏：</span>
            <span>销量：</span>
            <span></span>
          </div>
        </div>
        <div class="shopWrapper">
          <p class="shopName">{{ goodsInfo.shopName }}</p>
          <p class="followBtn">关注店铺</p>
        </div>
        <div class="goodsDes">{{ goodsInfo.goodDes }}</div>
      </scroll>
      <detail-bottom-bar class="detailBottomBar"></detail-bottom-bar>
    </div>
</template>

<script>
import Navbar from "components/common/navbar/NavBar"
import DetailBottomBar from "./detailBottomBar/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll"

export default {
  name: 'Detail',
  components: {
    Navbar,
    DetailBottomBar,
    Scroll
  },
  data() {
    return {
      id:null,
      navTitle:['商品','评论','推荐'],
      currentIndex:0,
      goodsInfo:{},
      imgUrl:''
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.goodsInfo = this.$store.state.currentDetil;
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .navTitle {
    display: flex;
  }
  .navTitleItem {
    flex: 1;
  }
  .selected {
    color: red;
  }
  .back {
    padding: 0 10px;
  }
  .navbar {
    background-color: #fff;
  }
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;  
  }
  .scroll {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
  .showTop {
    height: 45vh;
    border: 1px solid #aaa;
  }
  .showPrice {
    margin: 0;
    padding: 0;
  }
  .title {
    margin: 2vh 0;
  }
  .price {
    color: orange;
    font-size: 5vh;
  }
  .saleData {
    display: flex;
    color: #888888;
  }
  .saleData > span {
    flex: 1;
  }
  .shopWrapper {
    display: flex;
    border:1px solid #aaa;
    align-items: center;
  }
  .shopName {
    width: 20vw;
    height: 15vw;
    line-height: 15vw;
    flex-grow: 2;
  }
  .followBtn {
    width: 25vw;
    height: 10vw;
    line-height: 10vw;
    text-align: center;
    background-color:orange;
    border-radius: 20px;
    margin: 0 2vw;
  }
  .goodsDes {
    height: 50vh;
    border-bottom: 1px solid #aaa;
  }
</style>