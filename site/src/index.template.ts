const createTemplate = (params) => {
    return (
        `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://js.arcgis.com/4.5/esri/css/main.css">
                <title>${params.htmlWebpackPlugin.options.title}</title>
                <script type="text/javascript">
                    window["FabricConfig"] = {
                        fontBaseUrl: "${params.htmlWebpackPlugin.options.fabricFontBasePath}"
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