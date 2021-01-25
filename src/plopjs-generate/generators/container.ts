import { NodePlopAPI } from "plop";
import { Config } from "../types/config";

const containerGenerator = (plop: NodePlopAPI, config: Config): void => {
  plop.setGenerator("container", {
    description: "this is a test generator",
    prompts: [], // array of inquirer prompts
    actions: [
      {
        type: "add",
        templateFile: "../templates/test.hbs",
        path: "./test.txt",
        force: config.force,
        abortOnFail: true,
        data: {},
      },
    ],
  });
};

export default containerGenerator;
