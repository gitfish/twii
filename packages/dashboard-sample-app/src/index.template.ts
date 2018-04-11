const createTemplate = (params) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${params.htmlWebpackPlugin.options.title}</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="css/material-components-web.css" />
                <link rel="stylesheet" href="css/blueprint.css" />
                <script type="text/javascript">
                    window["AppConfig"] = ${JSON.stringify(params.htmlWebpackPlugin.options.AppConfig)};
                    window["FabricConfig"] = {
                        fontBaseUrl: window.AppConfig.env.fabricFontBasePath
                    };
                </script>
            </head>
            <body>
                <div id="main"></div>
            </body>
        </html>`
    );
};

export { createTemplate as default, createTemplate }