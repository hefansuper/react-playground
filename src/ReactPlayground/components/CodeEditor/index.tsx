/*
 * @Author: stephenHe
 * @Date: 2025-03-31 15:47:22
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-03 20:39:54
 * @Description: 左边的编辑器部分
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/index.tsx
 */

import { useContext } from "react";
import { debounce } from "lodash-es";

import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../PlaygroundContext";

export default function CodeEditor() {
  const { files, setFiles, selectedFileName, setSelectedFileName, theme } =
    useContext(PlaygroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <FileNameList />
      <Editor
        file={file}
        onChange={debounce(onEditorChange, 500)}
        options={{
          theme: `vs-${theme}`,
        }}
      />
    </div>
  );
}
