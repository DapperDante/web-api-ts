const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};