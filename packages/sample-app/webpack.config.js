const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const containsFilter = (...values) => {
    return (filename) => {
        return values.some(value => {
            return filename.indexOf(value) >= 0;
        });
    }
};

const isNodeModuleFile = containsFilter("node_modules");

const endsWithFilter = (...extensions) => {
    return (filename) => {
        return extensions.some(ext => {
            return filename.endsWith(ext);
        });
    };
};

const defaultPublicPath = "/";;

const createConfig = (env) => {
    const publicPath = env && env.publicPath ? env.publicPath : defaultPublicPath;
    const defaultAppEnv = {
        fabricFontBasePath: publicPath.endsWith("/") ? publicPath.substring(0, publicPath.length - 1) : publicPath,
        fabricIconBasePath: `${publicPath.endsWith("/") ? publicPath.substring(0, publicPath.length - 1) : publicPath}/icons/fabric/`
    };
    
    const appEnv = Object.assign({}, defaultAppEnv, env);
    const production = env && env.production ? true : false;
    const buildVersion = env && env.buildVersion ? env.buildVersion : production ? "Unknown" : "DEV";
    
    const AppConfig = {
        production: production,
        publicPath: publicPath,
        buildVersion: buildVersion,
        buildDate: new Date().toString(),
        env: appEnv
    };

    const config = {
        mode: production ? "production" : "development",
        entry: {
            main: "./src/main.tsx"
        },
        output: {
            filename: production ? "[name].[chunkhash].js" : "[name].js",
            path: path.join(__dirname, "dist"),
            publicPath: publicPath
        },
        module: {
            rules: [
                {
                    test: endsWithFilter(".ts", ".tsx"),
                    loader: "ts-loader",
                    exclude: isNodeModuleFile
                },
                {
                    test: endsWithFilter(".jpg", ".png", ".gif"),
                    use: [
                        { loader: "file-loader" }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".js", ".jsx", ".tsx", ".ts"],
            modules: [
                path.resolve(__dirname, "src"), "node_modules"
            ],
            alias: {
                "package.json$": path.resolve(__dirname, "package.json")
            }
        },
        devtool: "source-map",
        devServer: {
            contentBase: "./dist",
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Common Sample",
                template: "src/index.template.ts",
                AppConfig: AppConfig,
                chunksSortMode: "none"
            }),
            new CopyWebpackPlugin([
                { from: "../../fonts/ms", to: "fonts" },
                { from: "../../node_modules/@uifabric/icons/fonts", to: "icons/fabric" },
                { from: "../../node_modules/material-components-web/dist/material-components-web.min.css", to: "css/material-components-web.css" },
                { from: "../../node_modules/@blueprintjs/core/lib/css/blueprint.css", to: "css/blueprint.css" },
                { from: "../../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css", to: "css/blueprint-datetime.css" },
                { from: "../../node_modules/@blueprintjs/table/lib/css/table.css", to: "css/blueprint-table.css" },
                { from: "../../node_modules/antd/dist/antd.min.css", to: "css/antd.css" }
            ]),
            new WriteFilePlugin()
        ]
    };

    if(production) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: config.devtool === "source-map"
            })
        );

    }

    return config;
};

module.exports = createConfig;