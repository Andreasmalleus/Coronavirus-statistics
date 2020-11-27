const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode : "development",
    entry: './src/index.js',
    output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                      loader: 'file-loader',
                    },
                  ],
            },

        ]
    },
    plugins: [
        new CopyPlugin({
            patterns : [
                {from: "./public/index.html", to: "index.html"},
                {from: "./public/styles.css", to: "styles.css"},
                {from: "./public/images/", to: "images/"}
            ]
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true
    }
};