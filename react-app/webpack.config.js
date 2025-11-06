const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:3001/",
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        clean: true,
    },
    devServer: {
        port: 3001,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        ['@babel/preset-env', { targets: 'defaults' }]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/i,
                oneOf: [
                    {
                        issuer: /\.[jt]sx?$/,
                        use: ['@svgr/webpack'],
                    },
                    {
                        type: 'asset/resource',
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "reactApp",
            filename: "remoteEntry.js",
            exposes: {
                "./ReactApp": "./src/App",
            },
            shared: ["react", "react-dom"],
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};