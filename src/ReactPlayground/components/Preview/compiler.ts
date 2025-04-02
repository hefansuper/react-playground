/*
 * @Author: stephenHe
 * @Date: 2025-04-02 13:49:06
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-02 13:50:35
 * @Description: 通过standalone来编译jsx和ts文件
 * @FilePath: /react playground/src/ReactPlayground/components/Preview/compiler.ts
 */
import { transform } from "@babel/standalone";
import { Files } from "../../PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../files";

export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  let result = "";
  try {
    result = transform(code, {
      // presets 指定 react 和 typescript，也就是对 jsx 和 ts 语法做处理
      presets: ["react", "typescript"],
      filename,
      plugins: [],
      // retainLines 是编译后保持原有行列号不变。
      retainLines: true,
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }
  return result;
};

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
