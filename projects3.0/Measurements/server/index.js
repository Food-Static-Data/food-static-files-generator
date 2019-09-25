// trying to separate code from generate Array.
// but we'll move them out soon.
// @TODO can we replace it with alias?

const { parse } = require("path");
const _ = "lodash";
const {
  setupPath,
  readAllFiles,
  generateArrWithId
} = require("@groceristar/static-data-generator");

// import { parse } from "path";

const { write } = require("../dist/index.cjs");

write("./output/test.json", [{ name: "Test" }]);
