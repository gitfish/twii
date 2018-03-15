const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const isNodeModuleFile = (filename) => {
    return filename.indexOf("node_modules") >= 0;
};

const isTSFile = (filename) => {
    return filename.endsWith(".ts") || filename.endsWith(".tsx");
};

const isJSFile = (filename) => {
    return filename.endsWith(".js") || filename.endsWith(".jsx");
};

const isCssFile = (filename) => {
    return filename.endsWith(".css");
};

const isSassFile = (filename) => {
    return filename.endsWith(".scss");
};

const isWoffFile = (filename) => {
    return filename.endsWith(".woff");
};

const isWoff2File = (filename) => {
    return filename.endsWith(".woff2");
}

const isSvgFontFile = (filename) => {
    return filename.endsWith(".font.svg");
};

const isTrueTypeFontFile = (filename) => {
    return filename.endsWith(".ttf");
};

const isEOTFontFile = (filename) => {
    return filename.endsWith(".eot");
}

const isFontFile = (filename) => {
    return isWoffFile(filename) || isWoff2File(filename) || isSvgFontFile(filename) || isTrueTypeFontFile(filename) || isEOTFontFile(filename);
};

const isJSONFile = (filename) => {
    return filename.endsWith(".json");
};

const isPNGFile = (filename) => {
    return filename.endsWith(".png");
};

const isJPGFile = (filename) => {
    return filename.endsWith(".jpg");
};

const isGIFFile = (filename) => {
    return filename.endsWith(".gif");
}

const isImageFile = (filename) => {
    return isPNGFile(filename) || isJPGFile(filename) || isGIFFile(filename);
};

const defaultPublicPath = "/";
const defaultFabricFontBasePath = ""; // Fabric appends /fonts/...
const defaultFabricIconBasePath = "/icons/fabric/";

const createConfig = (env) => {
    const publicPath = env && env.publicPath ? env.publicPath : defaultPublicPath;
    const fabricFontBasePath = env && env.fabricFontBasePath ? env.fabricFontBasePath : defaultFabricFontBasePath;
    const fabricIconBasepath = env && env.fabricIconBasePath ? env.fabricIconBasePath : defaultFabricIconBasePath;
    const production = env && env.production ? true : false;
    const configName = !production && env && env.configName ? env.configName : undefined;
    const buildVersion = env && env.buildVersion ? env.buildVersion : production ? "Unknown" : "DEV";

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
                    enforce: "pre",
                    test: isJSFile,
                    loader: "source-map-loader",
                    exclude: isNodeModuleFile
                },
                {
                    enforce: "pre",
                    test: isTSFile,
                    loader: "source-map-loader",
                    exclude: isNodeModuleFile
                },
                {
                    test: isTSFile,
                    loader: "ts-loader",
                    exclude: isNodeModuleFile
                },
                {
                    test: isImageFile,
                    use: [
                        { loader: "file-loader" }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".js", ".tsx", ".ts"],
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
                title: "UI Dashboard Sample",
                template: "src/index.template.ts",
                fabricFontBasePath: fabricFontBasePath
            }),
            new CopyWebpackPlugin([
                { from: "../../fonts/ms", to: "fonts" }
            ]),
            new CopyWebpackPlugin([
                { from: "../../node_modules/@uifabric/icons/fonts", to: "icons/fabric" }
            ]),
            new WriteFilePlugin()
        ]
    };

    const AppConfig = {
        production: production,
        basePath: publicPath,
        fabricIconBasePath: fabricIconBasepath,
        fabricFontBasePath: fabricFontBasePath,
        buildVersion: buildVersion,
        configName: configName,
        buildDate: new Date()
    };

    config.plugins.push(
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(production ? "production" : "development"),
            AppConfig: JSON.stringify(AppConfig)
        })
    )

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