<template>
    <div id="home">
      <navbar class="home-navbar"><div slot="center">购物车</div></navbar>
      <tab-control :title="['类别0','类别1','类别2']" @tabClick='changeTab' ref="tabControl0"
        v-show="isTabControlFixed" class="tabShow">
      </tab-control>
      <scroll class="scroll" ref="mainSrcoll" :probe-type='3' @backPosition='getPosition'>
        <swiper>
          <swiper-item v-for="(item,index) in resultSwiper" :key="index">
            <a :href="item.aLink">
              <img :src="item.imgUrl" @load="swiperImgLoad">
            </a>
          </swiper-item>
        </swiper>
        <scroll class="scrollRecommendView">
          <recommend-view>
            <recommend-view-item v-for="(item,index) in resultRecommendView" :key="index">
              <a :href="item.aLink">
                  <img :src="item.imgUrl">
                  <div>{{item.title}}</div>
              </a>
            </recommend-view-item>
          </recommend-view>
        </scroll>
        <tab-control :title="['类别0','类别1','类别2']" @tabClick='changeTab' ref="tabControl">
        </tab-control>
        <goods-list>
          <goods-list-item v-for="(item, index) in resultGoodsList[currentType]" :key="index">
            <a :href="item.aLink">
              <img :src="item.imgUrl">
              <div>{{item.title}}</div>
            </a>
          </goods-list-item>
        </goods-list>
      </scroll>
      <!-- 修饰符.native，监听一个组件的原生事件 -->
      <back-top @click.native='backTopClick' v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
  import Navbar from "components/common/navbar/NavBar"
  import {Swiper, SwiperItem} from "components/common/swiper"
  import {RecommendView, RecommendViewItem} from "components/common/recommendview"
  import TabControl from "components/common/tabcontrol/TabControl"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/common/backtop/BackTop"

  import {GoodsList, GoodsListItem} from "components/content/goods"

  import {getHomeMultidata} from "network/home"

  export default {
    name: 'Home',
    components:{
      Navbar,
      Swiper,SwiperItem,
      RecommendView,RecommendViewItem,
      GoodsList,GoodsListItem,
      TabControl,
      Scroll,
      BackTop
    },
    data() {
      return {
        resultSwiper: null,
        resultRecommendView:null,
        resultGoodsList:[],
        currentType:'homeType0',
        isShowBackTop:false,
        isTabControlFixed: false,
        tabOffsetTop: 0,
        isLoad: false,
        currentY: 0
      }
    },
    // 生命周期函数，首页组件一经创建就进行网络请求拿到数据进行展示
    created() {
      getHomeMultidata().then(res => {
        // 拿到网络请求数据后保存到当前组件中
        this.resultSwiper = res.data.swiper
        this.resultRecommendView = res.data.recommend

        this.resultGoodsList.homeType0 = res.data.goods.homeType0
        this.resultGoodsList.homeType1 = res.data.goods.homeType1
        this.resultGoodsList.homeType2 = res.data.goods.homeType2
      }).catch(err => {
        console.log(err);
      })
    },
    activated() {
      // 回来时 to 当前记录的滚动位置，0ms
      this.$refs.mainSrcoll.scrollTo(0,this.currentY,0)
    },
    deactivated() {
      // 离开时记录当前滚动位置
      this.currentY = this.$refs.mainSrcoll.getScrollY()
    },
    methods: {
      /*
        事件监听方法
      */
      changeTab: function(index) {
        switch (index) {
          case 0:
            this.currentType = 'homeType0';
            break;
          case 1:
            this.currentType = 'homeType1';
            break;
          case 2:
            this.currentType = 'homeType2';
            break;
        }
        // 确保真假tabControl的样式统一
        this.$refs.tabControl0.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      backTopClick() {
        // 点击置顶按钮后找到ref标记后mainSrcoll，使用scroll对象内的方法
        this.$refs.mainSrcoll.scroll.scrollTo(0,0,400)
      },
      getPosition(position) {
        // 1.判断backTop是否显示
        if (position.y < -100) {
          this.isShowBackTop = true
        }else {
          this.isShowBackTop = false
        }

        // 决定tabControl是否吸顶(position: fixed)
        if (position.y < -this.offsetTop) {
          this.isTabControlFixed = true
        }else {
          this.isTabControlFixed = false
        }
      },
      swiperImgLoad() {
        // 为了不多次调用，使用了isLoad
        if (!this.isLoad) {
          this.isLoad = true
          // 获取TabControl的offsetTop
          // 所有的组件都有一个属性 $el 用于获取组件中的元素
          this.offsetTop = this.$refs.tabControl.$el.offsetTop
        }
      }
    }
  }
</script>

<style>
  #home {
    height: 100vh;
  }
  .home-navbar {
    background-color: skyblue;
    color: #fff;
  }

  .scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .scrollRecommendView {
    overflow: hidden;
  }
  .scrollRecommendView>*{
    display: inline-flex;
  }
  .backTopActive {
    display: none;
  }

  .tabShow {
    position: relative;
    z-index: 9;
  }
</style>
