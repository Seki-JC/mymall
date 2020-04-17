<template>
    <div class='tabbar-item' @click="itemClick" >
        <div v-if="!isActived">
          <slot name="item-icon"></slot>
        </div>
        <div v-else>
          <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
          <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'tabbarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data:function(){
      return{
        
      }
    },
    computed: {
      isActived() {
        // 正在活跃的组件$route的路径'/home' 与 传进来的this.path进行比较
        return this.$route.path.indexOf(this.path) != -1
      },
      activeStyle() {
        return this.isActived ? {color:this.activeColor} : {}
      }
    },
    methods:{
      itemClick(){
        // 点击对应组件时更改$router的值
        this.$router.push(this.path);
      }
    }
}
</script>

<style>
  .tabbar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  .tabbar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /* 取消图片下面的间隙 */
  }
  /* 
  :class='{actived:isActived}'
  .actived{
    background-color: rgba(200, 200, 200, 1);
  } */
</style>