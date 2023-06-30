import type { Config } from "jest";

import defaultConfig from "../../jest.config";

export default <Config>{
  ...defaultConfig,

  rootDir: "../../",
  roots: ["<rootDir>/test/unit"],
};
