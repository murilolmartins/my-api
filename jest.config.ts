import type { Config } from "jest";

export default <Config>{
  preset: "ts-jest",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },
};
