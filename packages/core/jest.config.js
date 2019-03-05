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
      "office-ui-fabric-react/lib/(.*)$": "office-ui-fabric-react/lib-commonjs/$1",
      "@uifabric/styling/lib/(.*)$": "@uifabric/styling/lib-commonjs/$1",
      "@uifabric/utilities/lib/(.*)$": "@uifabric/utilities/lib-commonjs/$1",
      "@twii/lang": "@twii/lang/lib-commonjs/index.js",
      "@twii/router/lib/(.*)$": "@twii/router/lib-commonjs/$1",
      "\\.(css|scss|less)$": "identity-obj-proxy"
    },
    preset: "ts-jest",
    setupFiles: ["raf/polyfill"],
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.cjs.json"
      }
    }
}