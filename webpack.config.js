const path = require('path');
const fs = require('fs');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'wp-bundle.js'
    },
    devServer: {
        port: 8090,
        historyApiFallback: true,
        https: {
            key: fs.readFileSync('./ca_cert/cert.key'),
            cert: fs.readFileSync('./ca_cert/cert.crt'),
            ca: fs.readFileSync('./ca_cert/cert.pem'),
        }
    },
    module: {
        rules:[
            {
                test: /\.(ts|tsx|js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_module/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
                resolve: {
                    extensions:['', '.js', '.jsx']
                }
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test:/\.(png|jpg)$/,
                use: [
                    'file-loader',
                ]
            }
        ]
    },
    optimization: {
        minimize: false
    }
};