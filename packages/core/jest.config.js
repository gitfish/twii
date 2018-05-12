module.exports = {
    collectCoverage: true,
    collectCoverageFrom: [
      "src/**/*.ts?(x)",
      "!src/**/*.d.ts?(x)"
    ],
    coverageDirectory: "__coverage__",
    transform: {
      ".(ts|tsx)": "../../node_modules/ts-jest/preprocessor.js"
    },
    testMatch: [
      "**/test/**/*Test.ts?(x)"
    ],
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js"
    ],
    moduleDirectories: [
      "node_modules",
      "src"
    ]
}