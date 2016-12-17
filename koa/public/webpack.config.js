var config = require('../config/config');
var webpack = require('webpack');
var path=require('path');
module.exports = {
    entry: {
        "index":"./originjs/index",
    },
    //输出文件出口
    output: {
        
        path:path.resolve(__dirname, "js"),  //输出路径
        filename: '[name].js'     //输出文件名，文件可以自己定义，[name]的意思是与入口文件的文件对应，可以不用[name]，
    },
    module:{
            loaders: [
              {
                test: path.join(__dirname, 'originjs'),
                loader: 'babel-loader',
                query: {
                  presets: ['es2015']
                }
              }, 
              {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
              }
            ]
    },
    /*
     *
     * */
    // resolve: {
        /*
         * 别名配置，配置之后，可以在别的js文件中直接使用require('d3')，将导入的文件作为一个模块导入到你需要的项目中，不用配置别也可会当作模块导入项目中，只是你要重复写路径而已。
         * */
        // alias: {
        //     'd3': 'd3/d3.min.js'
        // }
    // }　　

    plugins: config.debug ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: true, evaluate: false, drop_console: true, properties: false},
            output: {comments: false, quote_keys: true, keep_quoted_props: true},
            sourceMap: false,
            mangle: false
        })] : []
};