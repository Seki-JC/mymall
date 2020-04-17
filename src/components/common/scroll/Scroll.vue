<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number, // 非实时派发scroll事件和位置参数, 类型由0,1,2,3, 
            default: 1
        },
        scrollX: {
            type: Boolean, // 是否横向滚动
            default: true
        },
        scrollY: {
            type: Boolean, // 是否纵向滚动
            default: true
        },
        click: {
            type: Boolean, // 是否派发点击事件
            default: true
        },
        listenScroll: {
            type: Boolean, // 监听滚动
            default: false
        }
    },
    data() {
        return {
            scroll: null,
        }
    },
    mounted() {
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: this.click,
            scrollX: this.scrollX,
            scrollY: this.scrollY
        })
        // 监听滚动的位置
        this.scroll.on('scroll',(position) => {
            this.$emit('backPosition',position)
        })
    },
    methods: {
        scrollTo(x,y,time=300) {
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>
    
</style>