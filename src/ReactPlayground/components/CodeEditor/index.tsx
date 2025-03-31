/*
 * @Author: stephenHe
 * @Date: 2025-03-31 15:47:22
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-03-31 22:16:18
 * @Description: 左边的编辑器部分
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/index.tsx
 */

import Editor from "./Editor";
import FileNameList from "./FileNameList";

export default function CodeEditor() {
  const file = {
    name: "guang.tsx",
    value: 'import lodash from "lodash";\n\nconst a = <div>guang</div>',
    language: "typescript",
  };

  function onEditorChange() {
    console.log(...arguments);
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
