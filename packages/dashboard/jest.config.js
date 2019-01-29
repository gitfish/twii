module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.ts?(x)",
      "!src/**/*.d.ts?(x)"
    ],
    coverageDirectory: "__coverage__",
    transform: {
      ".(ts|tsx|js|jsx)": "./node_modules/ts-jest/preprocessor.js"
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
      "@twii/common/lib/(.*)$": "@twii/common/lib-commonjs/$1"
    },
    setupFiles: ["raf/polyfill"],
    globals: {
      "ts-jest": {
        tsConfigFile: "tsconfig.cjs.json"
      }
    }
}