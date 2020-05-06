<template>
    <div class="RecommendView">
        <scroll class="scrollRecommendView">
            <recommend-view-item v-for="(item,index) in resultRecommendView" :key="index">
                <a :href="item.aLink">
                    <img :src="item.imgUrl">
                    <div>{{item.title}}</div>
                </a>
            </recommend-view-item>
        </scroll>
    </div>
</template>

<script>
    import RecommendViewItem from "components/common/recommendview/RecommendViewItem"

    import Scroll from "components/common/scroll/Scroll"

    export default {
        name:'RecommendView',
        components: {
            RecommendViewItem,
            Scroll
        },
        props: {
            resultRecommendView: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>

<style>
    .scrollRecommendView {
        overflow: hidden;
        display: flex;
    }
    .scrollRecommendView>*{
        display: inline-flex;
    }
</style>