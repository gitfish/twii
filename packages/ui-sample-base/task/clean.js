const del = require("del");
const path = require("path");
const distPattern = path.join(__dirname, "..", "lib", "**/*");

del.sync([distPattern]);