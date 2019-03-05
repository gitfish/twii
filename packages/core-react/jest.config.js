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
    "@twii/lang": "@twii/lang/lib-commonjs/index.js",
    "@twii/core/lib/(.*)$": "@twii/core/lib-commonjs/$1",
    "@twii/router/lib/(.*)$": "@twii/router/lib-commonjs/$1"
  },
  preset: "ts-jest",
  setupFiles: ["raf/polyfill"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.cjs.json"
    }
  }
}