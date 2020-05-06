<template>
    <div class="outer-swiper">
        <div class="swiper-ul" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
            <swiper-item v-for="(item,index) in resultSwiper" :key="index">
                <a :href="item.aLink">
                    <img :src="item.imgUrl" @load="swiperImgLoad">
                </a>
            </swiper-item>
        </div>
        <div class="outer-indicator">
            <div v-for="(item, index) in slideCount" :key="index" class="indicator" :class="{swiperActive:isActive(index)}">
            </div>
        </div>
    </div>
</template>

<script>
    import SwiperItem from "components/common/swiper/SwiperItem"
    export default {
        name: 'Swiper',
        components: {
            SwiperItem
        },
        props: {
            resultSwiper: {
                type: Array,
                default: []
            },
            interval: {     // 间隔时间
                type: Number,
                default: 2000
            },
            transtionTime: {  // 过渡时间
                type: Number,
                default: 200
            },
            moveRatio: {    // 拉动比
                type: Number,
                default: 0.25
            }
        },
        data() {
            return {
                currentIndex: 1,  // 当前的图片索引
                slideCount: 0,   // items总数
                totalWidth: 0,  // 轮播图的宽度
                transStyle:{},
                isScrolling:false,  // 自动滚动标识
                isBegin:false,      // 手动滚动标识
                beginX:{type:Number},
                currentX:{type:Number},
                distance:{type:Number},
                isdeactivated: false
            }
        },
        mounted() {
            setTimeout(() => {
                this.handle();
                this.setTimer();
            }, 100);
        },
        activated() {
            if (this.isDeactivated) {
                this.setTimer();
                this.isDeactivated = false
            }
        },
        deactivated() {
            this.stopTimer();
            this.isDeactivated = true;
        },
        computed: {
            isActive:function() {
                return function(index) {
                    if (this.currentIndex == 0 && index == this.slideCount-2){
                        // 当第一页往左拉时，最后一个小点亮
                        return true
                    }else {
                        // 普通情况和 最后一张往右拉时
                        return (index == this.currentIndex) || (index == (this.currentIndex % (this.slideCount-2)))
                    }
                }
            }
        },
        methods: {
            /*
                DOM相关
            */
            handle: function() {
                let swiperUl = document.querySelector('.swiper-ul');
                let swiperLi = swiperUl.children;
                this.totalWidth = swiperLi[0].offsetWidth; // 获取单个item的宽度

                let first = swiperLi[0].cloneNode(true);
                let last = swiperLi[swiperLi.length-1].cloneNode(true);
                swiperUl.appendChild(first);    // 第一个节点复制放最后
                swiperUl.insertBefore(last,swiperLi[0]); // 最后的节点复制放第一
                this.slideCount = swiperLi.length;       // items总数
                this.transStyle = swiperUl.style;
                this.transStyle.left = -this.totalWidth+"px" // 先转到第一张
                // 过渡完成后判断，挪到这里来了
                let that = this;
                swiperUl.addEventListener("transitionend",function(){
                    // 滚动过渡完毕，标识为false
                    that.isScrolling = false;
                    // 进入末张判断
                    if (that.currentIndex >= that.slideCount-1){
                        that.currentIndex = 1;
                        that.transStyle.transition = 'none'
                        that.transStyle.left = -that.totalWidth+"px"
                    }else if (that.currentIndex <= 0) {
                        // 开局往左拉，调到最后一张图片（实际倒数第二张）
                        that.currentIndex = that.slideCount-2;
                        that.transStyle.transition = 'none'
                        that.transStyle.left = -(that.slideCount-2) * that.totalWidth+"px"
                    }
                })
            },
            /*
                定时器相关操作
            */
            setTimer() {
                this.timer = window.setInterval(() => {
                    // 当前位置加一
                    this.currentIndex++;
                    // 当前应该在的位置 w
                    this.toScoll();
                }, this.interval);
            },
            stopTimer: function() {
                window.clearInterval(this.timer);
            },
            /*
                滚动开始
            */
            toScoll:function() {
                // 滚动开始，标识为true
                this.isScrolling = true;
                let w = -(this.currentIndex) * this.totalWidth
                // 指定过渡时间
                this.transStyle.transition =  "left "+this.transtionTime+"ms"
                // 移动到当前索引的位置 w
                this.transStyle.left = w+"px"
            },
            /*
                触摸开始
            */
            touchStart:function(e) {
                // 在滚动时，不可拖动
                if (this.isScrolling) {return}
                this.isBegin = true;
                this.beginX = e.targetTouches[0].clientX
                // 停止计时器
                this.stopTimer()
            },
            touchMove:function(e) {
                if (this.isBegin) {
                    this.currentX = e.changedTouches[0].clientX
                    this.distance = this.currentX - this.beginX
                    let currentPosition = -this.currentIndex * this.totalWidth // 用当前页数 * 轮播图宽的方式获取当前位置
                    let totalPosition = parseInt(currentPosition + this.distance)
                    this.transStyle.left = totalPosition+"px"
                }
            },
            /*
                触摸结束
            */
            touchEnd:function(e) {
                if (this.isBegin) {
                    // 判断移动的距离和方向
                    let distance1 = Math.abs(this.distance)
                    if (this.distance === 0){
                        this.isBegin = false
                        return
                    }else if (distance1 > this.moveRatio * this.totalWidth && this.distance < 0) {
                        // 手指往左拉动，图片向下一张移动
                        this.currentIndex++
                    }else if (distance1 > this.moveRatio * this.totalWidth && this.distance > 0) {
                        // 手指往右拉动，图片向上一张移动
                        this.currentIndex--
                    }
                    this.toScoll()
                    this.setTimer()
                }
                this.isBegin = false
            },
            swiperImgLoad() {
                // 为了不多次调用，使用了isLoad变量，只执行一次
                if (!this.isLoad) {
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style>
    .outer-swiper {
        width: 100%;
        height: 55vw;
        box-shadow: 0px 2px 1px rgba(150, 150, 150, 0.1);
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;
    }
    .swiper-ul {
        position: absolute;
        display: flex;
    }
    .outer-indicator {
        position: absolute;
        bottom: 20px;
        
    }
    .indicator {
        float: left;
        width: 10px;
        height: 10px;
        margin: 0 5px;
        background-color:rgba(200, 200, 200, 0.7);
        border-radius: 50%;
    }
    .outer-indicator :first-child,
    .outer-indicator :last-child {
        display: none;
    }
    .swiperActive {
        background-color:rgba(250, 59, 59, 0.8);
    }
</style>