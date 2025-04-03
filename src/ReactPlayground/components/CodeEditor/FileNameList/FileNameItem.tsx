/*
 * @Author: stephenHe
 * @Date: 2025-04-02 11:27:44
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-03 15:18:54
 * @Description: 单个的文件组件
 * @FilePath: /react playground/src/ReactPlayground/components/CodeEditor/FileNameList/FileNameItem.tsx
 */
import classnames from "classnames";
import React, { useState, useRef, useEffect, MouseEventHandler } from "react";

import styles from "./index.module.scss";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  readonly: boolean;
  onEditComplete: (name: string) => void;
  onRemove: MouseEventHandler;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    actived = false,
    readonly,
    creating,
    onClick,
    onRemove,
    onEditComplete,
  } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus();
    }
  }, [creating]);

  const hanldeInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tabs-item-input"]}
          value={name}
          onBlur={hanldeInputBlur}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <span style={{ marginLeft: 5, display: "flex" }} onClick={onRemove}>
              <svg width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
};
