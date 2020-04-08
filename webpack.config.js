
const path = require('path');//Node.js中操作路径的模块
const HtmlWebpackPlugin = require('html-webpack-plugin');//自动添加浏览器兼容前缀
const htmlPlugin = new HtmlWebpackPlugin({
	template:'./src/index.html',
	filename:'main.html'
});
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	mode:'development',//编译模式
	entry: path.join(__dirname,'./src/index.js'),//入口文件的绝对路径 , __dirname表示当前文件所在的路径
	  output: {
	    path: path.join(__dirname,'./dist'),//输出文件的存放路径
	    filename: 'bundle.js'//输出文件名称
	  },
	plugins:[htmlPlugin,new VueLoaderPlugin()],//插件列表
	module:{//加载器
		rules: [
			//打包处理CSS文件,postcss-loader:自动添加浏览器兼容前缀加载器
			{test: /\.css$/,use: ['style-loader' , 'css-loader', 'postcss-loader']},
			//打包处理LESS文件
			{test: /\.less$/,use: ['style-loader' , 'css-loader' , 'less-loader']},
			{test: /\.sass$/,use: ['style-loader' , 'css-loader' , 'sass-loader']},
			{test: /\.scss$/,use: [{
				  loader: "style-loader" // 将 JS 字符串生成为 style 节点
			  }, {
				  loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
			  }, {
				  loader: "sass-loader" // 将 Sass 编译成 CSS
			  }]
			},
			//打包处理样式中字体和图片
			{test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use: ['url-loader?limit=237817']},
			//打包处理js文件中高级语法
			{test: /\.js$/,use: ['babel-loader'],exclude:/node_modules/},
			//打包处理VUE文件
			{test: /\.vue$/,use: ['vue-loader']},
		]
	},
	resolve:{
		alias:{//修改Vue被导入时候包的路径
			'vue$':'vue/dist/vue.js'
		}
	},
};