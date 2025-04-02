/*
 * @Author: stephenHe
 * @Date: 2025-04-02 10:51:49
 * @LastEditors: stephenHe
 * @LastEditTime: 2025-04-02 10:51:55
 * @Description: 工具文件
 * @FilePath: /react playground/src/ReactPlayground/utils.ts
 */

export const fileName2Language = (name: string) => {
  const suffix = name.split(".").pop() || "";
  if (["js", "jsx"].includes(suffix)) return "javascript";
  if (["ts", "tsx"].includes(suffix)) return "typescript";
  if (["json"].includes(suffix)) return "json";
  if (["css"].includes(suffix)) return "css";
  return "javascript";
};
