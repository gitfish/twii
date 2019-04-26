const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const GeneratorPlugin = require("./webpack.plugins").GeneratorPlugin;

const contains = (...values) => {
    return (filename) => {
        return values.some(value => {
            return filename.indexOf(value) >= 0;
        });
    }
};

const isNodeModuleFile = contains("node_modules");

const some = (...p) => {
    return (filename => {
        return p.some(e => e(filename));
    });
};

const endsWith = (...extensions) => {
    return (filename) => {
        return extensions.some(ext => {
            return filename.endsWith(ext);
        });
    };
};

const createConfig = (env) => {
    const publicPath = env && env.publicPath ? env.publicPath : "/";
    const defaultAppEnv = {
        fabricFontBasePath: "/", // Fabric appends /fonts/... 
        fabricIconBasePath: "/icons/fabric/"
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
            index: ["./src/index.tsx"]
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
                    test: endsWith(".ts", ".tsx", ".js"),
                    loader: "source-map-loader",
                    exclude: some(isNodeModuleFile, endsWith(".html.ts"))
                },
                {
                    test: endsWith(".ts", ".tsx"),
                    loader: "ts-loader",
                    exclude: isNodeModuleFile
                },
                {
                    test: endsWith(".woff", ".woff2", ".svg", ".ttf", ".eot"),
                    use: [
                        { loader: "file-loader" }
                    ]
                },
                {
                    test: endsWith(".png", ".jpg", ".gif", ".bmp"),
                    use: [
                        { loader: "file-loader" }
                    ]
                },
                {
                    test: endsWith(".css"),
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" }
                    ]
                }
            ]
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
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
            historyApiFallback: {
                rewrites: [
                    {from: /.*\.html/, to: '/index.html'}
                ]
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Core React Sample",
                template: "src/index.html.ts",
                AppConfig: AppConfig,
                chunks: ["index"],
                chunksSortMode: "none"
            }),
            new GeneratorPlugin({
                generator: () => {
                    return `window.AppConfig = ${JSON.stringify(AppConfig, null, "\t")};`
                },
                filename: "AppConfig.js"
            })
        ]
    };

    return config;
};

module.exports = createConfig;