/*
 * @Author: stephenHe
 * @Date: 2025-03-31 17:53:49
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-03 15:19:40
 * @Description: 上面的文件列表
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/FileNameList/index.tsx
 */
import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";

import { FileNameItem } from "./FileNameItem";
import styles from "./index.module.scss";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../files";

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

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name);
    setSelectedFileName(name);

    setCreating(false);
  };

  const [creating, setCreating] = useState(false);

  const addTab = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 8) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          readonly={readonlyFileNames.includes(item)}
          creating={creating && index === arr.length - 1}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          onRemove={(e) => {
            e.stopPropagation();
            handleRemove(item);
          }}
        ></FileNameItem>
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
