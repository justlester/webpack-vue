const { VueLoaderPlugin } = require('vue-loader');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        fallback:  { 
            "util": false,
            "os":false ,
            "path":false
        }
    },
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            indentedSyntax: true // optional
                        },
                        // Requires >= sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new ZipPlugin({
            filename: 'dist'
        }),
        new HtmlWebpackPlugin({
            template: './src/test.html'
        }),
        new Dotenv(),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ]
}
