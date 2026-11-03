import * as R from "react/jsx-dev-runtime";
import { translateProps } from "./shared";

export const Fragment = R.Fragment;
export const jsxDEV = (type: unknown, props: any, key: any, isStatic: boolean, source: any, self: any) =>
  (R.jsxDEV as any)(type, translateProps(type, props), key, isStatic, source, self);
