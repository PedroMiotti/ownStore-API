module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePathIgnorePatterns: [
        "/src/infrastructure/",
        "/src/adapters/controllers/base/",
        "/src/adapters/providers/base",
        "/src/adapters/repositories/base/",
        "/src/application/shared/",
        "/src/index.ts",
    ],
};