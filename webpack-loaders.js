const webpack = require('webpack')

const PATH = require('./webpack-paths')

exports.devServer = options => {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port,
            contentBase: './client/dist',
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multistep: true
            })
        ]
    }
}

exports.css = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
    include: PATH.css
}

exports.font = {
  test: /\.ttf$/,
  use: ['file-loader']
}

exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['babel-loader']
}
