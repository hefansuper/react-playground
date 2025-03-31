/*
 * @Author: stephenHe
 * @Date: 2025-03-31 17:53:28
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-03-31 21:51:03
 * @Description: 编辑器部分
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/Editor.tsx
 */
import MonacoEditor, { OnMount } from "@monaco-editor/react";

export default function Editor() {
  const code = `export default function App() {
    return <div>xxx</div>
  }
    `;

  // 设置编辑器的默认配置

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 1：解决编辑器报错的问题
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // jsx设置为保留 输入 <div> 输出 <div>，保留原样
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      // 设置 esModuleInterop 会在编译的时候自动加上 default 属性。可以使用 import React from 'react'，而不是 import * as React from 'react'
      esModuleInterop: true,
    });

    // 2：设置编辑器的快捷键
    // cmd + J 格式化代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });
  };

  return (
    <MonacoEditor
      height={"100%"}
      path={"guang.tsx"}
      language={"typescript"}
      onMount={handleEditorMount}
      value={code}
      options={{
        fontSize: 14,
        // 是到了最后一行之后依然可以滚动一屏，关闭后就不会了
        scrollBeyondLastLine: false,
        // 缩略图
        minimap: {
          enabled: false,
        },
        // 滚动条
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
      }}
    />
  );
}
