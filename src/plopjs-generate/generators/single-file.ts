import { NodePlopAPI } from "plop";
import styledComponentTemplate from "../templates/functionComponent/component.styled.tsx.hbs";
import functionComponentTemplate from "../templates/functionComponent/component.tsx.hbs";
import { Config } from "../types/config";
import GetActions from "../utils/actions";

interface SingleFileData {
  name: string;
  folder: string;
  h: boolean;
  hook: string[];
  styled: boolean;
  export: boolean;
}

const singleFileGenerator = (plop: NodePlopAPI, config: Config): void => {
  const { Add, Append } = GetActions(config.ComponentPath, config);
  plop.setGenerator("single-file", {
    description: "this is a test generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name?",
      },
      {
        type: "input",
        name: "folder",
        message: `Component location (${config.ComponentPath}...) `,
      },
      {
        type: "confirm",
        name: "h",
        message: "Include hooks?",
      },
      {
        type: "checkbox",
        name: "hook",
        message: "hooks to include:",
        when: (answers): boolean => answers.h,
        choices: [
          "useState",
          "useEffect",
          "useContext",
          "useReducer",
          "useCallback",
          "useMemo",
          "useRef",
          "useLayoutEffect",
        ],
      },
      {
        type: "confirm",
        name: "styled",
        message: "Include styles?",
      },
      {
        type: "confirm",
        name: "export",
        message: "Export module from folder?",
      },
    ],
    actions: ((data: SingleFileData) => {
      const actions = [];
      actions.push(
        Add(functionComponentTemplate, "{{path folder name}}.tsx", {
          data: { fullComponent: false, styled: data.styled },
        })
      );
      if (data.styled) {
        actions.push(
          Add(styledComponentTemplate, "{{path folder name}}.styled.tsx", {
            data: { fullComponent: false, styled: data.styled },
          })
        );
      }
      if (data.export) {
        actions.push(
          Append(
            '{{path folder "index"}}.ts',
            /import \w+(, {[\w, ]*?})? from "[./\\\w]+";/g,
            {
              template:
                'export { default as {{componentCase name}} } from "./{{fileCase name}}"',
            }
          )
        );
      }
      return actions;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any,
  });
};

export default singleFileGenerator;
