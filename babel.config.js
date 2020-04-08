
//JS语法编译器 用于将ECMAScript 2015+语法转换为向后兼容版本的 JavaScript 代码

module.exports = {
	"presets": [
	    [
	      "@babel/preset-env",
	      {
	        "useBuiltIns": "entry"
	      }
	    ]
	  ],
	"plugins":[
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-class-properties',
		"transform-remove-strict-mode",
		['import', {
		      libraryName: 'vant',
		      libraryDirectory: 'es',
		      style: true
		    }, 'vant']
	],
	"ignore": [
		"./src/lib/MUI/js/mui.js",
		"./src/lib/MUI/js/mui.min.js",
	]
}