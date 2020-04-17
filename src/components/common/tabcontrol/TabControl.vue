<template>
    <div class='TabControl'>
        <div v-for="(item,index) in title" :key='index' class="TabControlItem"
        :class="{tabActive:index === currentIndex}" @click="titleClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props: {
        title: {
            type: Array
        }
    },
    data:function(){
      return{
        currentIndex: 0
      }
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index;
            // 自定义事件tabClick,把当前点击的的值传给父组件
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style>
    .TabControl {
        display: flex;
        text-align: center;
        background-color: #fff;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    .TabControlItem {
        flex: 1;
    }
    .TabControlItem span{
        padding: 5px;
    }
    .tabActive {
        color: skyblue;
    }
    .tabActive span {
        border-bottom: skyblue 3px solid;
    }
</style>