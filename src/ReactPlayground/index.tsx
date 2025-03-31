/*
 * @Author: stephenHe
 * @Date: 2025-03-31 15:18:36
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-03-31 15:27:14
 * @Description:
 * @FilePath: /react playground/src/ReactPlayground/index.tsx
 */
import { Allotment } from "allotment";
import "allotment/dist/style.css";

export default function ReactPlayground() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <div>111</div>
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <div>222</div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
