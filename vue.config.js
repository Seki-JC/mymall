module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // src已经起别名@，cli3支持
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'common': '@/common'
            }
        }
    }
}