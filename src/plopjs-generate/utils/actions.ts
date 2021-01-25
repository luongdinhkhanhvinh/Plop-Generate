import { AddActionConfig, AppendActionConfig } from "plop";
import { Config } from "../types/config";

type TemplateParams = {
  templateFile?: string;
  template?: string;
};

const GetActions = (BasePath: string, cfg: Config) => {
  const ActionPath = [process.cwd(), BasePath].join("/");

  const Add = (
    templateFile: string,
    path: string,
    options?: Partial<AddActionConfig>
  ): AddActionConfig => {
    const defaultAction: AddActionConfig = {
      type: "add",
      templateFile,
      template: "",
      path: `${ActionPath}/${path}`,
      force: cfg.force,
      abortOnFail: true,
      data: {},
    };
    return { ...defaultAction, ...options };
  };

  const Append = (
    path: string,
    pattern: string | RegExp,
    templateArgs: TemplateParams,
    options?: Partial<AppendActionConfig>
  ): AppendActionConfig => {
    const { template, templateFile } = templateArgs;
    const defaultAction: AppendActionConfig = {
      type: "append",
      path: `${ActionPath}/${path}`,
      pattern,
      template: template || "",
      templateFile: templateFile || "",
      force: cfg.force,
      abortOnFail: true,
      data: {},
      unique: true,
      separator: "",
    };
    return { ...defaultAction, ...options };
  };

  return {
    Add,
    Append,
  };
};

export default GetActions;
