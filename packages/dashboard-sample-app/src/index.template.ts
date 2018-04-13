const createTemplate = (params) => {
    const options = params.htmlWebpackPlugin.options;
    const AppConfig = options.AppConfig;
    return (
        `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${options.title}</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/material-components-web.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/blueprint.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/blueprint-datetime.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/blueprint-table.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/antd.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/phosphor/index.css" />
                <script type="text/javascript">
                    window["AppConfig"] = ${JSON.stringify(AppConfig)};
                    window["FabricConfig"] = {
                        fontBaseUrl: "${AppConfig.env.fabricFontBasePath}"
                    }
                </script>
            </head>
            <body>
                <div id="main"></div>
            </body>
        </html>`
    );
};

export { createTemplate as default, createTemplate }