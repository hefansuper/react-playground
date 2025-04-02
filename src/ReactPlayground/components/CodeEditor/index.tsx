/*
 * @Author: stephenHe
 * @Date: 2025-03-31 15:47:22
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-02 13:33:43
 * @Description: 左边的编辑器部分
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/index.tsx
 */

import { useContext } from "react";

import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../PlaygroundContext";

export default function CodeEditor() {
  const { files, setFiles, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  );
}
