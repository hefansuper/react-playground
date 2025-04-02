/*
 * @Author: stephenHe
 * @Date: 2025-04-02 11:27:44
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-02 11:29:33
 * @Description: 单个的文件组件
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/FileNameList/FileNameItem.tsx
 */
import classnames from "classnames";
import React, { useState, useRef, useEffect } from "react";

import styles from "./index.module.scss";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, actived = false, onClick } = props;

  const [name, setName] = useState(value);

  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};
