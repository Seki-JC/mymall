<template>
    <div class="ShopcartCount">
        <div class="ShopcartCountItem">合计：￥{{totalPrice}}</div>
    </div>
</template>

<script>

export default {
  name: 'ShopcartCount',
  components:{
  },
  activated() {
  },
  data() {
      return {
          
      }
  },
  props: {
    goodsList: {
        type: Array,
        default:[]
    }
  },
  computed: {
      totalPrice() {
          let sum = 0;
          for (let i=0;i<this.goodsList.length;i++) {
              sum = sum + parseInt(this.goodsList[i].price) * parseInt(this.goodsList[i].count);
          }
          return sum
      }
  }
}
</script>

<style>
    .ShopcartCount {
        height: 60px;
        background-color: #aaa;
        position: relative;
    }
    .ShopcartCountItem {
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>
