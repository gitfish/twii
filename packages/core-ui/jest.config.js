const path = require("path");

const tsJestTransformPath = path.join(path.dirname(require.resolve("ts-jest")), "preprocessor.js");

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.ts?(x)",
      "!src/**/*.d.ts?(x)"
    ],
    coverageDirectory: "__coverage__",
    transform: {
      ".(ts|tsx|js|jsx)": tsJestTransformPath
    },
    testMatch: [
      "**/src/**/*.test.*"
    ],
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js"
    ],
    moduleDirectories: [
      "node_modules",
      "src"
    ],
    moduleNameMapper: {
      "office-ui-fabric-react/lib/(.*)$": "office-ui-fabric-react/lib-commonjs/$1",
      "@uifabric/styling/lib/(.*)$": "@uifabric/styling/lib-commonjs/$1",
      "@uifabric/utilities/lib/(.*)$": "@uifabric/utilities/lib-commonjs/$1",
      "\\.(css|scss|less)$": "identity-obj-proxy"
    },
    setupFiles: ["raf/polyfill"]
}