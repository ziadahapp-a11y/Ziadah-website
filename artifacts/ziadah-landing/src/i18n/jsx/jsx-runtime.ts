import * as R from "react/jsx-runtime";
import { translateProps } from "./shared";

export const Fragment = R.Fragment;
export const jsx = (type: unknown, props: any, key?: any) => (R.jsx as any)(type, translateProps(type, props), key);
export const jsxs = (type: unknown, props: any, key?: any) => (R.jsxs as any)(type, translateProps(type, props), key);
