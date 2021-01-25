import * as fs from "fs";
import * as path from "path";
import { NodePlopAPI, PlopCfg } from "plop";
import defaultConfig from "./configuration";
import componentGenerator from "./generators/components";
import singleFileGenerator from "./generators/single-file";
import HooksPartial from "./templates/partials/hooks.hbs";
import { Config } from "./types/config";
import BaseHelpers from "./utils/helpers";

export default function pack(plop: NodePlopAPI, config: PlopCfg): void {
  const PlopReactConfig: Config = { ...defaultConfig, ...config };
  // register all shared helpers
  Object.entries(BaseHelpers).forEach(([key, value]) =>
    plop.addHelper(key, value)
  );
  const hooksPartial: string = fs.readFileSync(
    path.join(plop.getPlopfilePath(), HooksPartial),
    {
      encoding: "utf-8",
    }
  );
  plop.addPartial("hooks", hooksPartial);
  componentGenerator(plop, PlopReactConfig);
  singleFileGenerator(plop, PlopReactConfig);
}
module.exports = pack;
