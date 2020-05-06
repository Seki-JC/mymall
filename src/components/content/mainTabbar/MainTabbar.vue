<template>
    <tabbar>
      <tabbar-item path='/home'>
        <img slot="item-icon" src="~assets/img/tabbar/home.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/home-1.png">
        <div slot="item-text">首页</div>
      </tabbar-item>
      <tabbar-item path='/about' activeColor='orange'>
        <img slot="item-icon" src="~assets/img/tabbar/about.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/about-1.png">
        <div slot="item-text">分类</div>
      </tabbar-item>
      <tabbar-item path='/shopcart' activeColor='yellowgreen'>
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart-1.png">
        <div slot="item-text">购物车</div>
      </tabbar-item>
      <tabbar-item path='/user' activeColor='blue'>
        <img slot="item-icon" src="~assets/img/tabbar/user.png">
        <img slot="item-icon-active" src="~assets/img/tabbar/user-1.jpg">
        <div slot="item-text">我的</div>
      </tabbar-item>
    </tabbar>
</template>

<script>
import tabbar from 'components/common/tabbar/tabbar'
import tabbarItem from 'components/common/tabbar/tabbarItem'

export default {
  name: 'MainTabbar',
  components:{
    tabbar,
    tabbarItem
  }
}
</script>

<style>

</style>
