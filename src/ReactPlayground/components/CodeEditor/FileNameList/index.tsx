/*
 * @Author: stephenHe
 * @Date: 2025-03-31 17:53:49
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-02 11:28:42
 * @Description: 上面的文件列表
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/FileNameList/index.tsx
 */
import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";

import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";

export default function FileNameList() {
  const {
    files,
    removeFile,
    addFile,
    updateFileName,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext);

  const [tabs, setTabs] = useState([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
        ></FileNameItem>
      ))}
    </div>
  );
}


