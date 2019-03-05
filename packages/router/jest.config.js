const path = require("path");

module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.ts?(x)",
      "!src/**/*.d.ts?(x)"
    ],
    coverageDirectory: "__coverage__",
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
      "@twii/lang": "@twii/lang/lib-commonjs/index.js"
    },
    preset: "ts-jest",
    setupFiles: ["raf/polyfill"],
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.cjs.json"
      }
    }
}