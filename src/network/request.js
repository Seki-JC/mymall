import axios from "axios"

// 导出函数
export function request(config) {
    // 创建axios实例
    const instance = axios.create({
        timeout: 1000
    })
    // 拦截器
    // instance.interceptors.request.use(config => {
    //     // 拦截请求成功的处理
    //     // 拦截请求完成后需要将config原封不动返回，不然不会请求
    //     return config
    // },
    // err => {
    //     // 拦截请求失败的处理
    // })

    // 返回带Promise的实例
    return instance(config)
}