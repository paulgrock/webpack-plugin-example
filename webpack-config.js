var webpack = require( "webpack" );
var CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var GlobalizePlugin = require( "globalize-webpack-plugin" );
var path = require('path');
module.exports = env => ({
	entry: env.production ?  {
		main: "./app/index.js",
		vendor: [
			"globalize",
			"globalize/dist/globalize-runtime/number",
			"globalize/dist/globalize-runtime/currency",
			"globalize/dist/globalize-runtime/date",
			"globalize/dist/globalize-runtime/message",
			"globalize/dist/globalize-runtime/plural",
			"globalize/dist/globalize-runtime/relative-time",
			"globalize/dist/globalize-runtime/unit"
		]
	} : "./app/index.js",
	devtool: "eval-source-map",
	output: {
		path: path.resolve(__dirname, (env.production ? "./dist" : "./tmp")),
		publicPath: env.production ? "" : "http://localhost:8080/",
		filename: env.production ? "app.[hash].js" : "app.js"
	},
	plugins: [
		new HtmlWebpackPlugin({
			production: env.production,
			template: "./index-template.html"
		}),
		new GlobalizePlugin({
			production: env.production,
			developmentLocale: "en",
			supportedLocales: [ "ar", "de", "en", "es", "pt", "ru", "zh" ],
			messages: "messages/[locale].json",
			output: "i18n/[locale].[hash].js"
		})
	].concat( env.production ? [
		new CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.js"
		})
	] : [])
});
