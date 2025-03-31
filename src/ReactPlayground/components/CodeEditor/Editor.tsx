/*
 * @Author: stephenHe
 * @Date: 2025-03-31 17:53:28
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-03-31 17:57:42
 * @Description: 编辑器部分
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/Editor.tsx
 */
import MonacoEditor from "@monaco-editor/react";

export default function Editor() {
  const code = `export default function App() {
    return <div>xxx</div>
}
    `;

  return (
    <MonacoEditor
      height="100%"
      path={"guang.tsx"}
      language={"typescript"}
      value={code}
    />
  );
}
