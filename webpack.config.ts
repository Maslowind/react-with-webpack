import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, EnvironmentPlugin } from 'webpack';
import dotenv from 'dotenv';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

if (process.env.NODE_ENVIRONMENT) {
	dotenv.config({ path: `.env.${process.env.NODE_ENVIRONMENT}` });
} else {
	dotenv.config({ path: '.env' });
}

export default {
	mode: process.env.NODE_ENV,
	context: _resolve(__dirname, 'src'),
	entry: {
		bundle: './index.tsx',
	},
	output: {
		publicPath: '/',
		filename: '[name].js',
		path: _resolve(__dirname, 'build'),
	},
	devServer: {
		hot: true,
		port: Number(process.env.PORT) || 5000,
		host: '0.0.0.0',
		historyApiFallback: {
			index: '/',
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader',
			},
		],
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		extensions: ['.js', '.ts', '.tsx'],
		alias: {
			root: __dirname,
			'@': _resolve(__dirname, 'src'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({ template: '../public/index.html' }),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'assets', to: 'assets', noErrorOnMissing: true },
				// { from: 'pwa/manifest.json', to: 'manifest.json' },
			],
		}),
		new CleanWebpackPlugin(),
		new EnvironmentPlugin({ ...process.env }),
	],
} as Configuration;
