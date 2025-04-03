/*
 * @Author: stephenHe
 * @Date: 2025-03-31 15:18:36
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-03 20:33:05
 * @Description:
 * @FilePath: /react playground/src/ReactPlayground/index.tsx
 */
import { useContext } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

import { PlaygroundContext } from "./PlaygroundContext";

import "./index.scss";

export default function ReactPlayground() {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <div style={{ height: "100vh", width: "100vw" }} className={theme}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
