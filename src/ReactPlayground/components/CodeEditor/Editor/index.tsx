/*
 * @Author: stephenHe
 * @Date: 2025-03-31 17:53:28
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-03-31 22:22:11
 * @Description: 编辑器部分
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/Editor/index.tsx
 */
import MonacoEditor, { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from "./ata";
import { editor } from "monaco-editor";

export interface EditorFile {
  name: string;
  value: string;
  language: string;
}

interface IEditorProps {
  file: EditorFile;
  onChange?: EditorProps["onChange"];
  options?: editor.IStandaloneEditorConstructionOptions;
}

export default function Editor(props: IEditorProps) {
  const { file, onChange, options } = props;

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

    // 3：获取编辑器中的类型
    // 最开始获取一次类型，然后内容改变之后获取一次类型，获取类型之后用 addExtraLib 添加到 ts 里。
    const ata = createATA((code, path) => {
      // 手动添加相应的类型声明文件，使编辑器正确解析和提示这些自定义类型，使得编辑器能够识别并提供这些额外类型的代码补全、类型检查和文档提示等功能
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });
    // 3.1：监听编辑器内容的变化
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });
    // 3.2：初始化的时候获取一次类型
    ata(editor.getValue());
  };

  return (
    <MonacoEditor
      height={"100%"}
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
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
        ...options,
      }}
    />
  );
}
