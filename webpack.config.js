const dev = process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: `${__dirname}/src/`,
    entry: {
        index: './page/page'
    },
    output: {
        path: `${__dirname}/dist/js`,
        filename: '[name].js',
        publicPath: 'dist/js',
    },
    devtool: dev ? 'cheap-module-eval-source-map' : '',
    watch: dev,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: dev,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: dev,
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: `${__dirname}`,
        publicPath: `/dist/js/`,
        hot: true,
    },
    resolve: {
        modules: [`${__dirname}/src`, 'node_modules']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
