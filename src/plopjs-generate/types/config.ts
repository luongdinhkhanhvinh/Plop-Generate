import { PlopCfg } from "plop";

type Stylings = "css" | "ts";

export interface ReactPlopConfig {
  Style: Stylings;
  ComponentPath: string;
  ContainerPath: string;
}

export type Config = ReactPlopConfig & PlopCfg;
