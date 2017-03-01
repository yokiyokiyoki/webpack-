const path = require('path');
// 引入vux-loader，添加vux2必须这样配置
const vuxLoader = require('vux-loader')
let webpackConfig = {
    entry: {
        app: ['./src/main.js'],
        // 需要打包的第三方插件
        // vendors: ['jquery']
    },
    output: {
        // 路径是从根目录到根目录下的dist，相当于cd进入
        path: path.resolve(__dirname, '../dist'),
        // 静态资源存放目录，可以直接在这里取文件
        publicPath: '/dist/',
        // 这个name对应的是entry里面的键的名字
        filename: 'bundle_[name].js'
    },
    module: {
        // 加载各种js，img文件资源
        rules: [{
                test: /\.js$/,
                loaders: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader',
                    'autoprefixer-loader', 'sass-loader'
                ] //2.0不支持缩写
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000
                }
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 字体解析
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                }
            }
        ]
    },
    // 启用位置信息调试
    devtool: 'source-map',
    // 配置别名
    resolve: {
        alias: {
            // 制定vue的别名，不然会输出vue.common.js
            'vue': 'vue/dist/vue.js',
            'src': path.resolve(__dirname, '../src'),
            'components': path.resolve(__dirname, '../src/components'),
            'img': path.resolve(__dirname, '../src/assets/img/'),

        }
    },
    // webpack-dev-sever的配置
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        proxy: {
            '/v2/*': {
                target: 'https://api.douban.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
}
// 添加vux2必须这样配置
module.exports = vuxLoader.merge(webpackConfig, {
    plugins: [{
            name: 'vux-ui'
        },
        {
            name: 'duplicate-style'
        }
    ]
})