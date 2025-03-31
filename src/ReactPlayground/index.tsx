/*
 * @Author: stephenHe
 * @Date: 2025-03-31 15:18:36
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-03-31 15:48:19
 * @Description:
 * @FilePath: /react playground/src/ReactPlayground/index.tsx
 */
import { Allotment } from "allotment";
import "allotment/dist/style.css";

import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

export default function ReactPlayground() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
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
