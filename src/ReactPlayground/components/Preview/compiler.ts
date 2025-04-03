/*
 * @Author: stephenHe
 * @Date: 2025-04-02 13:49:06
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-03 10:41:10
 * @Description: 通过standalone来编译jsx和ts文件
 * @FilePath: /react playground/src/ReactPlayground/components/Preview/compiler.ts
 */
import { transform } from "@babel/standalone";
import { Files } from "../../PlaygroundContext";
import { ENTRY_FILE_NAME } from "../../files";
import { PluginObj } from "@babel/core";

// 编译的时候，如果文件没导入react就自动导入react
export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code;
  const regexReact = /import\s+React/g;
  if (
    (filename.endsWith(".jsx") || filename.endsWith(".tsx")) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`;
  }
  return _code;
};

export const babelTransform = (
  filename: string,
  code: string,
  files: Files
) => {
  let result = "";
  const autoAddReactCode = beforeTransformCode(filename, code);

  try {
    result = transform(autoAddReactCode, {
      // presets 指定 react 和 typescript，也就是对 jsx 和 ts 语法做处理
      presets: ["react", "typescript"],
      filename,
      plugins: [customResolver(files)],
      // retainLines 是编译后保持原有行列号不变。
      retainLines: true,
    }).code!;
  } catch (e) {
    console.error("编译出错", e);
  }
  return result;
};

// 根据模块路径获取文件
const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split("./").pop() || "";
  if (!moduleName.includes(".")) {
    const realModuleName = Object.keys(files)
      .filter((key) => {
        return (
          key.endsWith(".ts") ||
          key.endsWith(".tsx") ||
          key.endsWith(".js") ||
          key.endsWith(".jsx")
        );
      })
      .find((key) => {
        return key.split(".").includes(moduleName);
      });
    if (realModuleName) {
      moduleName = realModuleName;
    }
  }
  return files[moduleName];
};

// 将json文件转为js文件 blob
const json2Js = (file: File) => {
  const js = `export default ${file.value}`;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

// 将css文件转为js文件 blob
const css2Js = (file: File) => {
  const randomId = new Date().getTime();
  const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
})()
    `;
  return URL.createObjectURL(
    new Blob([js], { type: "application/javascript" })
  );
};

// 自定义插件，将所有的import后面的路径替换为blob
function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value;
        if (modulePath.startsWith(".")) {
          const file = getModuleFile(files, modulePath);
          if (!file) return;

          if (file.name.endsWith(".css")) {
            path.node.source.value = css2Js(file);
          } else if (file.name.endsWith(".json")) {
            path.node.source.value = json2Js(file);
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: "application/javascript",
              })
            );
          }
        }
      },
    },
  };
}


export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME];
  return babelTransform(ENTRY_FILE_NAME, main.value, files);
};
