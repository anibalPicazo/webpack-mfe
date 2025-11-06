const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    devServer: { port: 3000 },
    output: { publicPath: "http://localhost:3000/" },
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
            name: "container",
            remotes: {
                reactApp: "reactApp@http://localhost:3001/remoteEntry.js",
                navbarMFE: "angularNavBar@http://localhost:3002/remoteEntry.js",
            },

            shared: ["react", "react-dom"],


        }),
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
};
