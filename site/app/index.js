const app = require("./app");
const yargs = require("yargs");

return app.listen(yargs.argv.port || 3000, () => {
    console.log("Server Started");
});
