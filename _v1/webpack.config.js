const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/js/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader'],
                
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true
            },
            hash: true
        })
    ]
}