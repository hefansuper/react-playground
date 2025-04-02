/*
 * @Author: stephenHe
 * @Date: 2025-04-02 11:12:08
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-02 11:13:40
 * @Description: 初始化文件files
 * @FilePath: /react playground/src/ReactPlayground/files.ts
 */

import { Files } from "./PlaygroundContext";
import { fileName2Language } from "./utils";

// import 模块的时候加一个 ?raw，就是直接文本的方式引入模块内容。
import importMap from "./template/import-map.json?raw";
import AppCss from "./template/App.css?raw";
import App from "./template/App.tsx?raw";
import main from "./template/main.tsx?raw";

// app 文件名
export const APP_COMPONENT_FILE_NAME = "App.tsx";
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = "import-map.json";
// app 入口文件名
export const ENTRY_FILE_NAME = "main.tsx";

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  "App.css": {
    name: "App.css",
    language: "css",
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
};
