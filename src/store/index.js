import Vue from 'vue'
import Vuex from 'vuex'

// 1.导入、安装插件
Vue.use(Vuex)

// 2.创建对象：用Vuex插件里的Store
const store = new Vuex.Store({
    state:{
        currentDetil:{},
        goodsList:[]
    },
    mutations:{
        pushGoodsList(state,val) {
            state.goodsList.push(val)
        },
        GoodsListChangeCount(state,payload) {
            state.goodsList[payload.index].count = parseInt(state.goodsList[payload.index].count) + parseInt(payload.val)
            if (state.goodsList[payload.index].count <= 0) {state.goodsList[payload.index].count = 0}
        },
        GoodsListEmptyCount(state) {
            // 刚 push 进去的最后一位的count清空
            state.goodsList[state.goodsList.length - 1].count = 0
        },
        updateGoodsList(state,val) {
            state.goodsList = val;
        },

        updateCurrentDetail(state,val) {
            state.currentDetil = val;
        }
    },
    getters:{
    },
    actions:{
    },
    modules:{}
})

// 3.导出store对象
export default store

// 4.在main.js导入store