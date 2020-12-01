const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode : "development",
    devtool: "source-map",
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
                      presets: ['@babel/preset-env',"@babel/preset-react"],
                      plugins: [
                        [
                          "@babel/plugin-proposal-class-properties",
                          {
                            "loose": true
                          }
                        ]
                      ]
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
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
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
        open: true,
        hot: true,
    }
};